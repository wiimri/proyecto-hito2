import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultPosts, categories } from "../data/seed.js";

const sessionKey = "mercadoVecinoUser";
const postsKey = "mercadoVecinoPosts";
const MarketplaceContext = createContext(null);
const demoUser = { id: 1, name: "Usuario Demo" };
const imageByCategory = {
  Deportes: "/assets/bicicleta-urbana.svg",
  Tecnologia: "/assets/notebook-lenovo.svg",
  Hogar: "/assets/silla-ergonomica.svg",
  Servicios: "/assets/fotografia-producto.svg",
};

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`No se pudo persistir ${key} en localStorage`, error);
  }
}

function inferImage(post) {
  const title = post.title?.toLowerCase() || "";
  if (title.includes("bicicleta")) return imageByCategory.Deportes;
  if (title.includes("notebook") || title.includes("lenovo")) return imageByCategory.Tecnologia;
  if (title.includes("silla")) return imageByCategory.Hogar;
  if (title.includes("fotografia") || title.includes("foto")) return imageByCategory.Servicios;
  return imageByCategory[post.category] || imageByCategory.Tecnologia;
}

function normalizePost(post) {
  const images = Array.isArray(post.images) && post.images.length > 0
    ? post.images
    : [post.imageUrl || inferImage(post)].filter(Boolean);
  return {
    ...post,
    ownerId: demoUser.id,
    seller: demoUser.name,
    imageUrl: images[0] || "",
    images,
  };
}

function normalizePosts(posts) {
  return posts.map(normalizePost);
}

export function MarketplaceProvider({ children }) {
  const [user, setUser] = useState(() => readJson(sessionKey, null));
  const [posts, setPosts] = useState(() => normalizePosts(readJson(postsKey, defaultPosts)));
  const [filters, setFilters] = useState({ search: "", category: "" });

  useEffect(() => {
    if (user) {
      writeJson(sessionKey, user);
      return;
    }
    localStorage.removeItem(sessionKey);
  }, [user]);

  useEffect(() => {
    writeJson(postsKey, posts);
  }, [posts]);

  const login = useCallback((email) => {
    setUser({ ...demoUser, email, token: "jwt.demo.token" });
  }, []);

  const register = useCallback((payload) => {
    setUser({ id: Date.now(), name: payload.name, email: payload.email, token: "jwt.demo.token" });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const createPost = useCallback((payload) => {
    const post = {
      ...payload,
      id: Date.now(),
      ownerId: user?.id || 1,
      seller: user?.name || "Usuario Demo",
      photo: "photo-camera",
    };
    setPosts((current) => [post, ...current]);
    return post;
  }, [user]);

  const updatePost = useCallback((id, payload) => {
    setPosts((current) => current.map((post) => post.id === id ? { ...post, ...payload } : post));
  }, []);

  const deletePost = useCallback((id) => {
    setPosts((current) => current.filter((post) => post.id !== id));
  }, []);

  const filteredPosts = useMemo(() => {
    const term = filters.search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesText = !term || post.title.toLowerCase().includes(term) || post.description.toLowerCase().includes(term);
      const matchesCategory = !filters.category || post.category === filters.category;
      return matchesText && matchesCategory;
    });
  }, [posts, filters]);

  const myPosts = useMemo(() => {
    if (!user) return [];
    return posts.filter((post) => post.ownerId === user.id || post.seller === user.name);
  }, [posts, user]);

  const value = useMemo(() => ({
    user,
    posts,
    categories,
    filters,
    filteredPosts,
    myPosts,
    isAuthenticated: Boolean(user),
    setFilters,
    login,
    register,
    logout,
    createPost,
    updatePost,
    deletePost,
  }), [user, posts, filters, filteredPosts, myPosts, login, register, logout, createPost, updatePost, deletePost]);

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace debe usarse dentro de MarketplaceProvider");
  }
  return context;
}
