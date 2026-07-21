/*import React, { useState } from "react";
import {
  ShoppingBag,
  Search,
  Package,
  User,
  Plus,
  Minus,
  Trash2,
  Edit3,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  LayoutGrid,
  ClipboardList,
  LogOut,
  ShieldCheck,
  MapPin,
  Clock,
  Truck,
  CheckCircle2,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  Star,
  ArrowRight,
} from "lucide-react";

// ---------- Brand Color Tokens ----------
const C = {
  indigoDeep: "#072a77", // Primary Navy/Royal Blue from logo
  indigo: "#1E3A8A",     // Secondary Blue
  indigoLight: "#3B82F6",// Light Blue accent
  gold: "#C59B27",        // Bright Gold from logo lettering
  goldLight: "#E5C158",   // Soft Gold accent
  wine: "#881337",        // Burgundy/Accent color for badges & errors
  cream: "#FAF8F2",       // Clean light background
  ink: "#0F172A",         // Dark text
  fog: "#E2E8F0",         // Background frame accent
};

const CATEGORY_LABELS = { handbag: "Handbags", shoe: "Shoes", veil: "Veils" };
const STATUS_STEPS = ["Pending", "Processing", "In Transit", "Delivered"];

// ---------- Seed data ----------
const seedProducts = [
  {
    id: "p1",
    name: "Zaria Woven Tote",
    category: "handbag",
    price: 18500,
    stock: 12,
    blurb: "Structured raffia-weave tote with gold clasp.",
    pattern: "diamond",
  },
  {
    id: "p2",
    name: "Kano Quilted Clutch",
    category: "handbag",
    price: 12000,
    stock: 8,
    blurb: "Evening clutch, quilted leatherette, chain strap.",
    pattern: "wave",
  },
  {
    id: "p3",
    name: "Sokoto Suede Loafer",
    category: "shoe",
    price: 21500,
    stock: 5,
    blurb: "Soft suede loafer with stitched gold trim.",
    pattern: "dot",
  },
  {
    id: "p4",
    name: "Katsina Block Heel",
    category: "shoe",
    price: 24000,
    stock: 7,
    blurb: "Comfort block heel, ankle strap, satin finish.",
    pattern: "diamond",
  },
  {
    id: "p5",
    name: "Indigo Silk Veil",
    category: "veil",
    price: 9500,
    stock: 20,
    blurb: "Lightweight silk-blend veil, hand-rolled edge.",
    pattern: "wave",
  },
  {
    id: "p6",
    name: "Amber Chiffon Veil",
    category: "veil",
    price: 8000,
    stock: 18,
    blurb: "Sheer chiffon veil with subtle shimmer thread.",
    pattern: "dot",
  },
  {
    id: "p7",
    name: "Malaysian Pearl Sandal",
    category: "shoe",
    price: 19500,
    stock: 6,
    blurb: "Beaded pearl-strap sandal, cushioned sole.",
    pattern: "diamond",
  },
  {
    id: "p8",
    name: "Dala Embossed Satchel",
    category: "handbag",
    price: 27500,
    stock: 4,
    blurb: "Embossed satchel with adjustable shoulder strap.",
    pattern: "wave",
  },
];

const seedOrders = [
  {
    id: "AMN-582913",
    customer: "Hauwa Bello",
    phone: "080-XXX-XXXX",
    items: [{ id: "p5", name: "Indigo Silk Veil", qty: 2, price: 9500 }],
    total: 19000,
    status: "In Transit",
    method: "Bank Transfer",
    createdAt: "2 days ago",
  },
];

// ---------- Visual pattern helper ----------
function TilePattern({
  variant = "diamond",
  color = C.gold,
  opacity = 0.16,
  size = 64,
}) {
  const shapes = {
    diamond: (
      <path
        d="M16 0 L32 16 L16 32 L0 16 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.4"
      />
    ),
    wave: (
      <path
        d="M0 16 Q8 4 16 16 T32 16"
        fill="none"
        stroke={color}
        strokeWidth="1.4"
      />
    ),
    dot: <circle cx="16" cy="16" r="2.4" fill={color} />,
  };
  return (
    <svg
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, opacity }}
    >
      <defs>
        <pattern
          id={`pat-${variant}`}
          width={size / 2}
          height={size / 2}
          patternUnits="userSpaceOnUse"
        >
          {shapes[variant]}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#pat-${variant})`} />
    </svg>
  );
}

function ProductThumb({ product }) {
  const bg = {
    handbag: C.indigo,
    shoe: C.wine,
    veil: C.indigoLight,
  }[product.category];

  const [imgFailed, setImgFailed] = useState(false);
  const showImage = product.image && !imgFailed;

  return (
    <div
      style={{ background: bg, position: "relative", overflow: "hidden" }}
      className="w-full aspect-square rounded-xl flex items-center justify-center"
    >
      {showImage ? (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <>
          <TilePattern
            variant={product.pattern}
            color={C.goldLight}
            opacity={0.35}
          />
          <span
            className="relative text-xl font-serif"
            style={{ color: C.goldLight }}
          >
            {product.name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </span>
        </>
      )}
    </div>
  );
}

function naira(n) {
  return "₦" + n.toLocaleString("en-NG");
}

// ---------- Main App ----------
export default function App() {
  const [mode, setMode] = useState("customer");
  const [page, setPage] = useState("home");
  const [products, setProducts] = useState(seedProducts);
  const [orders, setOrders] = useState(seedOrders);
  const [cart, setCart] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [myOrderIds, setMyOrderIds] = useState([]);
  const [checkoutInfo, setCheckoutInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [payMethod, setPayMethod] = useState("card");
  const [paying, setPaying] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [trackInput, setTrackInput] = useState("");
  const [trackResult, setTrackResult] = useState(null);
  const [trackError, setTrackError] = useState("");

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => {
    const p = products.find((pr) => pr.id === c.id);
    return s + (p ? p.price * c.qty : 0);
  }, 0);

  function addToCart(id) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing)
        return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { id, qty: 1 }];
    });
  }

  function changeQty(id, delta) {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }

  function placeOrder() {
    setPaying(true);
    setTimeout(() => {
      const code = "AMN-" + Math.floor(100000 + Math.random() * 899999);
      const order = {
        id: code,
        customer: checkoutInfo.name || "Guest Customer",
        phone: checkoutInfo.phone || "—",
        address: checkoutInfo.address || "—",
        items: cart.map((c) => {
          const p = products.find((pr) => pr.id === c.id);
          return { id: c.id, name: p.name, qty: c.qty, price: p.price };
        }),
        total: cartTotal,
        status: "Pending",
        method: {
          card: "Card",
          transfer: "Bank Transfer",
          ussd: "USSD",
          opay: "OPay",
          momo: "Mobile Money",
        }[payMethod],
        createdAt: "Just now",
      };
      setOrders((prev) => [order, ...prev]);
      setMyOrderIds((prev) => [order.id, ...prev]);
      setLastOrder(order);
      setCart([]);
      setPaying(false);
      setPage("success");
    }, 1600);
  }

  function updateOrderStatus(id, status) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  function saveProduct(p) {
    setProducts((prev) => {
      const exists = prev.some((pr) => pr.id === p.id);
      if (exists) return prev.map((pr) => (pr.id === p.id ? p : pr));
      return [...prev, { ...p, id: "p" + Date.now() }];
    });
    setEditingProduct(null);
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function runTrack() {
    const found = orders.find(
      (o) => o.id.toLowerCase() === trackInput.trim().toLowerCase()
    );
    if (found) {
      setTrackResult(found);
      setTrackError("");
    } else {
      setTrackResult(null);
      setTrackError("No order found with that tracking code.");
    }
  }

  const filteredProducts = products.filter((p) => {
    const catOk = categoryFilter === "all" || p.category === categoryFilter;
    const searchOk = p.name.toLowerCase().includes(search.toLowerCase());
    return catOk && searchOk;
  });

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-2"
      style={{
        background: C.fog,
        fontFamily: "'Georgia', 'Iowan Old Style', serif",
      }}
    >
      <div
        className="w-full max-w-[360px] h-[740px] rounded-[2.2rem] shadow-2xl overflow-hidden relative flex flex-col"
        style={{
          background: C.cream,
          border: `8px solid ${C.indigoDeep}`,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {mode === "customer" ? (
          <CustomerShell
            page={page}
            setPage={setPage}
            products={products}
            filteredProducts={filteredProducts}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            search={search}
            setSearch={setSearch}
            cart={cart}
            cartCount={cartCount}
            cartTotal={cartTotal}
            addToCart={addToCart}
            changeQty={changeQty}
            removeFromCart={removeFromCart}
            selectedProduct={selectedProduct}
            setSelectedProductId={setSelectedProductId}
            checkoutInfo={checkoutInfo}
            setCheckoutInfo={setCheckoutInfo}
            payMethod={payMethod}
            setPayMethod={setPayMethod}
            paying={paying}
            placeOrder={placeOrder}
            lastOrder={lastOrder}
            myOrderIds={myOrderIds}
            orders={orders}
            trackInput={trackInput}
            setTrackInput={setTrackInput}
            trackResult={trackResult}
            runTrack={runTrack}
            trackError={trackError}
            goAdmin={() => {
              setMode("admin");
              setPage(adminAuthed ? "adminHome" : "adminLogin");
            }}
          />
        ) : (
          <AdminShell
            page={page}
            setPage={setPage}
            adminAuthed={adminAuthed}
            setAdminAuthed={setAdminAuthed}
            products={products}
            orders={orders}
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
            saveProduct={saveProduct}
            deleteProduct={deleteProduct}
            updateOrderStatus={updateOrderStatus}
            exitAdmin={() => {
              setMode("customer");
              setPage("home");
              setAdminAuthed(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

// ================= CUSTOMER =================
function CustomerShell(props) {
  const { page, setPage } = props;
  return (
    <>
      <div className="flex-1 overflow-y-auto">
        {page === "home" && <HomePage {...props} />}
        {page === "product" && <ProductPage {...props} />}
        {page === "cart" && <CartPage {...props} />}
        {page === "checkout" && <CheckoutPage {...props} />}
        {page === "success" && <SuccessPage {...props} />}
        {page === "tracking" && <TrackingPage {...props} />}
        {page === "account" && <AccountPage {...props} />}
      </div>
      {page !== "success" && (
        <BottomNav page={page} setPage={setPage} cartCount={props.cartCount} />
      )}
    </>
  );
}

function TopBar({ title, onBack, right }) {
  return (
    <div
      className="flex items-center justify-between px-3 py-3 sticky top-0 z-10"
      style={{ background: C.indigoDeep }}
    >
      <div className="flex items-center gap-2">
        {onBack && (
          <button onClick={onBack} className="text-white/80 hover:text-white">
            <ChevronLeft size={20} />
          </button>
        )}
        <span
          className="text-white font-semibold text-base tracking-wide"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {title}
        </span>
      </div>
      {right}
    </div>
  );
}

function HomePage({
  filteredProducts,
  categoryFilter,
  setCategoryFilter,
  search,
  setSearch,
  setSelectedProductId,
  setPage,
}) {
  return (
    <div>
      {/* --- BRAND HEADER --- */}
      <div
        className="relative px-4 pt-5 pb-5"
        style={{ background: C.indigoDeep, overflow: "hidden" }}
      >
        <TilePattern variant="diamond" color={C.gold} opacity={0.12} />

        {/* Logo & Brand Header */}
        <div className="relative flex items-center gap-3 mb-3">
          <div className="p-1 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 shrink-0">
            <img
              src="/amana-logo.jpeg"
              alt="Amana Trading Logo"
              className="h-9 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
          <div className="flex flex-col">
            <span
              className="text-xs tracking-wider uppercase font-extrabold"
              style={{ color: C.goldLight }}
            >
              AMANA TRADING & LOGISTICS
            </span>
            <span className="text-[9px] text-white/70 uppercase tracking-widest font-medium">
              CO., LTD
            </span>
          </div>
        </div>

        {/* Tagline */}
        <h1
          className="relative text-xs text-white/90 font-serif leading-snug mt-1"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Handbags, Shoes &amp; Veils
          <br />
          <span className="text-[10px] text-white/60 font-sans font-normal">
            Imported from China &amp; Malaysia
          </span>
        </h1>

        {/* Search Bar */}
        <div className="relative mt-3 flex items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-sm">
          <Search size={14} color={C.indigoDeep} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="bg-transparent outline-none text-xs flex-1 text-slate-800"
          />
        </div>
      </div>

      {/* --- CATEGORY FILTER PILLS --- */}
      <div className="flex gap-1.5 px-3 py-2.5 overflow-x-auto">
        {[
          ["all", "All"],
          ["handbag", "Handbags"],
          ["shoe", "Shoes"],
          ["veil", "Veils"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setCategoryFilter(key)}
            className="px-3 py-1 rounded-full text-[11px] whitespace-nowrap border transition-colors"
            style={
              categoryFilter === key
                ? {
                    background: C.gold,
                    borderColor: C.gold,
                    color: C.indigoDeep,
                    fontWeight: 700,
                  }
                : { borderColor: "#CBD5E1", color: C.ink, background: "white" }
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* --- COMPACT PRODUCT GRID --- */}
      <div className="px-3 grid grid-cols-2 gap-2.5 pb-6">
        {filteredProducts.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedProductId(p.id);
              setPage("product");
            }}
            className="text-left bg-white p-2 rounded-xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all"
          >
            <ProductThumb product={p} />
            <p
              className="text-[11px] font-medium mt-1.5 line-clamp-1"
              style={{ color: C.ink }}
            >
              {p.name}
            </p>
            <p className="text-[11px] font-bold mt-0.5" style={{ color: C.indigoDeep }}>
              {naira(p.price)}
            </p>
          </button>
        ))}
        {filteredProducts.length === 0 && (
          <p
            className="col-span-2 text-center text-xs py-8"
            style={{ color: "#64748B" }}
          >
            No products match your search.
          </p>
        )}
      </div>
    </div>
  );
}

function ProductPage({ selectedProduct, addToCart, setPage }) {
  if (!selectedProduct) return null;
  const p = selectedProduct;
  return (
    <div>
      <TopBar title="Product" onBack={() => setPage("home")} />
      <div className="p-4">
        <ProductThumb product={p} />
        <p
          className="text-[10px] uppercase tracking-wide mt-3"
          style={{ color: C.gold }}
        >
          {CATEGORY_LABELS[p.category]}
        </p>
        <h2
          className="text-lg mt-0.5"
          style={{ fontFamily: "Georgia, serif", color: C.ink }}
        >
          {p.name}
        </h2>
        <p className="text-base mt-1 font-semibold" style={{ color: C.indigo }}>
          {naira(p.price)}
        </p>
        <p
          className="text-xs mt-2 leading-relaxed"
          style={{ color: "#5A5346" }}
        >
          {p.blurb}
        </p>
        <p
          className="text-[11px] mt-2"
          style={{ color: p.stock > 0 ? "#3E7A4F" : C.wine }}
        >
          {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
        </p>
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} fill={C.gold} color={C.gold} />
          ))}
          <span className="text-[10px] ml-1" style={{ color: "#9A9282" }}>
            (imported quality-checked)
          </span>
        </div>
        <button
          disabled={p.stock === 0}
          onClick={() => {
            addToCart(p.id);
            setPage("cart");
          }}
          className="w-full mt-5 py-2.5 rounded-xl text-white text-xs font-medium flex items-center justify-center gap-2 disabled:opacity-40"
          style={{ background: C.indigoDeep }}
        >
          <ShoppingBag size={15} /> Add to cart
        </button>
      </div>
    </div>
  );
}

function CartPage({
  cart,
  products,
  changeQty,
  removeFromCart,
  cartTotal,
  setPage,
}) {
  return (
    <div>
      <TopBar title="Your Cart" />
      <div className="p-4 space-y-3">
        {cart.length === 0 && (
          <p className="text-xs text-center py-12" style={{ color: "#9A9282" }}>
            Your cart is empty.
          </p>
        )}
        {cart.map((c) => {
          const p = products.find((pr) => pr.id === c.id);
          if (!p) return null;
          return (
            <div
              key={c.id}
              className="flex gap-3 items-center border-b pb-3"
              style={{ borderColor: "#EAE3D3" }}
            >
              <div className="w-12 h-12 shrink-0">
                <ProductThumb product={p} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium" style={{ color: C.ink }}>
                  {p.name}
                </p>
                <p className="text-[11px]" style={{ color: C.indigo }}>
                  {naira(p.price)}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <button
                    onClick={() => changeQty(c.id, -1)}
                    className="w-5 h-5 rounded-full border flex items-center justify-center"
                    style={{ borderColor: "#D8D0BE" }}
                  >
                    <Minus size={10} />
                  </button>
                  <span className="text-xs">{c.qty}</span>
                  <button
                    onClick={() => changeQty(c.id, 1)}
                    className="w-5 h-5 rounded-full border flex items-center justify-center"
                    style={{ borderColor: "#D8D0BE" }}
                  >
                    <Plus size={10} />
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(c.id)}
                style={{ color: C.wine }}
              >
                <Trash2 size={15} />
              </button>
            </div>
          );
        })}
      </div>
      {cart.length > 0 && (
        <div className="p-4 mt-auto">
          <div className="flex justify-between text-xs mb-3">
            <span style={{ color: "#5A5346" }}>Total</span>
            <span className="font-semibold" style={{ color: C.ink }}>
              {naira(cartTotal)}
            </span>
          </div>
          <button
            onClick={() => setPage("checkout")}
            className="w-full py-2.5 rounded-xl text-white text-xs font-medium"
            style={{ background: C.indigoDeep }}
          >
            Proceed to checkout
          </button>
        </div>
      )}
    </div>
  );
}

function CheckoutPage({
  checkoutInfo,
  setCheckoutInfo,
  cart,
  cartTotal,
  payMethod,
  setPayMethod,
  paying,
  placeOrder,
  setPage,
}) {
  const methods = [
    { key: "card", label: "Debit Card", icon: CreditCard },
    { key: "transfer", label: "Bank Transfer", icon: Building2 },
    { key: "ussd", label: "USSD", icon: Smartphone },
    { key: "opay", label: "OPay", icon: Wallet },
    { key: "momo", label: "Mobile Money", icon: Wallet },
  ];
  const canPay =
    checkoutInfo.name &&
    checkoutInfo.phone &&
    checkoutInfo.address &&
    cart.length > 0;

  return (
    <div>
      <TopBar title="Checkout" onBack={() => setPage("cart")} />
      <div className="p-4 space-y-3">
        <div>
          <label className="text-[10px]" style={{ color: "#8A8272" }}>
            Full name
          </label>
          <input
            value={checkoutInfo.name}
            onChange={(e) =>
              setCheckoutInfo({ ...checkoutInfo, name: e.target.value })
            }
            className="w-full mt-1 px-3 py-2 rounded-lg border text-xs outline-none"
            style={{ borderColor: "#D8D0BE" }}
            placeholder="Hauwa Bello"
          />
        </div>
        <div>
          <label className="text-[10px]" style={{ color: "#8A8272" }}>
            Phone number
          </label>
          <input
            value={checkoutInfo.phone}
            onChange={(e) =>
              setCheckoutInfo({ ...checkoutInfo, phone: e.target.value })
            }
            className="w-full mt-1 px-3 py-2 rounded-lg border text-xs outline-none"
            style={{ borderColor: "#D8D0BE" }}
            placeholder="080X XXX XXXX"
          />
        </div>
        <div>
          <label className="text-[10px]" style={{ color: "#8A8272" }}>
            Delivery address
          </label>
          <textarea
            value={checkoutInfo.address}
            onChange={(e) =>
              setCheckoutInfo({ ...checkoutInfo, address: e.target.value })
            }
            className="w-full mt-1 px-3 py-2 rounded-lg border text-xs outline-none"
            style={{ borderColor: "#D8D0BE" }}
            rows={2}
            placeholder="Street, city, state"
          />
        </div>

        <p className="text-[10px] mt-3 mb-1" style={{ color: "#8A8272" }}>
          Payment method (Paystack)
        </p>
        <div className="grid grid-cols-2 gap-2">
          {methods.map((m) => (
            <button
              key={m.key}
              onClick={() => setPayMethod(m.key)}
              className="flex items-center gap-2 px-2.5 py-2 rounded-lg border text-[11px]"
              style={
                payMethod === m.key
                  ? {
                      borderColor: C.gold,
                      background: "#FBF3E2",
                      color: C.indigoDeep,
                      fontWeight: 600,
                    }
                  : { borderColor: "#D8D0BE", color: C.ink }
              }
            >
              <m.icon size={13} /> {m.label}
            </button>
          ))}
        </div>

        <div
          className="flex justify-between text-xs pt-2 border-t mt-3"
          style={{ borderColor: "#EAE3D3" }}
        >
          <span style={{ color: "#5A5346" }}>Amount to pay</span>
          <span className="font-semibold" style={{ color: C.ink }}>
            {naira(cartTotal)}
          </span>
        </div>

        <button
          disabled={!canPay || paying}
          onClick={placeOrder}
          className="w-full mt-2 py-2.5 rounded-xl text-white text-xs font-medium disabled:opacity-40 flex items-center justify-center gap-2"
          style={{ background: C.indigoDeep }}
        >
          {paying ? "Processing payment…" : `Pay ${naira(cartTotal)}`}
        </button>
      </div>
    </div>
  );
}

function SuccessPage({ lastOrder, setPage }) {
  if (!lastOrder) return null;
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center py-8">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
        style={{ background: "#E7F3EA" }}
      >
        <CheckCircle2 size={28} color="#3E7A4F" />
      </div>
      <h2 className="text-base font-semibold" style={{ color: C.ink }}>
        Payment successful
      </h2>
      <p className="text-xs mt-1.5" style={{ color: "#5A5346" }}>
        Your order has been placed. Track it anytime with your tracking code.
      </p>
      <div
        className="mt-3 px-3 py-1.5 rounded-lg"
        style={{ background: C.indigoDeep }}
      >
        <span className="text-white text-xs font-mono tracking-wider">
          {lastOrder.id}
        </span>
      </div>
      <button
        onClick={() => setPage("tracking")}
        className="w-full mt-5 py-2.5 rounded-xl text-xs font-medium"
        style={{ background: C.gold, color: C.indigoDeep }}
      >
        Track this order
      </button>
      <button
        onClick={() => setPage("home")}
        className="w-full mt-2 py-2 rounded-xl text-xs"
        style={{ color: C.indigo }}
      >
        Continue shopping
      </button>
    </div>
  );
}

function TrackingPage({
  trackInput,
  setTrackInput,
  trackResult,
  runTrack,
  trackError,
  myOrderIds,
  orders,
}) {
  return (
    <div>
      <TopBar title="Track Package" />
      <div className="p-4">
        <div className="flex gap-2">
          <input
            value={trackInput}
            onChange={(e) => setTrackInput(e.target.value)}
            placeholder="Tracking code e.g. AMN-582913"
            className="flex-1 px-3 py-2 rounded-lg border text-xs outline-none"
            style={{ borderColor: "#D8D0BE" }}
          />
          <button
            onClick={runTrack}
            className="px-3 rounded-lg text-white text-xs"
            style={{ background: C.indigoDeep }}
          >
            Track
          </button>
        </div>
        {trackError && (
          <p className="text-[11px] mt-2" style={{ color: C.wine }}>
            {trackError}
          </p>
        )}

        {trackResult && (
          <div className="mt-5">
            <p className="text-[10px]" style={{ color: "#8A8272" }}>
              Order {trackResult.id}
            </p>
            <p className="text-xs mt-0.5" style={{ color: C.ink }}>
              {trackResult.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}
            </p>
            <div className="mt-4 space-y-0">
              {STATUS_STEPS.map((step, idx) => {
                const currentIdx = STATUS_STEPS.indexOf(trackResult.status);
                const done = idx <= currentIdx;
                return (
                  <div key={step} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                        style={{ background: done ? C.gold : "#E2DBCB" }}
                      >
                        {done && <Check size={11} color={C.indigoDeep} />}
                      </div>
                      {idx < STATUS_STEPS.length - 1 && (
                        <div
                          className="w-0.5 flex-1 min-h-[20px]"
                          style={{
                            background: idx < currentIdx ? C.gold : "#E2DBCB",
                          }}
                        />
                      )}
                    </div>
                    <p
                      className="text-xs pb-4"
                      style={{
                        color: done ? C.ink : "#B0A890",
                        fontWeight: done ? 600 : 400,
                      }}
                    >
                      {step}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {myOrderIds.length > 0 && !trackResult && (
          <div className="mt-6">
            <p className="text-[10px] mb-2" style={{ color: "#8A8272" }}>
              Your recent orders
            </p>
            {myOrderIds.map((id) => {
              const o = orders.find((ord) => ord.id === id);
              if (!o) return null;
              return (
                <button
                  key={id}
                  onClick={() => setTrackInput(id)}
                  className="w-full flex justify-between items-center py-2 border-b text-left"
                  style={{ borderColor: "#EAE3D3" }}
                >
                  <span className="text-xs font-mono" style={{ color: C.ink }}>
                    {id}
                  </span>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: "#F1ECDD", color: C.indigo }}
                  >
                    {o.status}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function AccountPage({ goAdmin }) {
  return (
    <div>
      <TopBar title="Account" />
      <div className="p-4">
        <div
          className="flex items-center gap-3 pb-4 border-b"
          style={{ borderColor: "#EAE3D3" }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: C.indigoDeep }}
          >
            <User size={18} color="white" />
          </div>
          <div>
            <p className="text-xs font-medium" style={{ color: C.ink }}>
              Guest Customer
            </p>
            <p className="text-[10px]" style={{ color: "#9A9282" }}>
              Sokoto, Nigeria
            </p>
          </div>
        </div>
        <div className="mt-4 space-y-1">
          {[
            "Saved addresses",
            "Payment methods",
            "Notifications",
            "Help & support",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between py-2.5 border-b text-xs"
              style={{ borderColor: "#EAE3D3", color: C.ink }}
            >
              {item} <ChevronRight size={14} color="#B0A890" />
            </div>
          ))}
        </div>
        <button
          onClick={goAdmin}
          className="w-full mt-6 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 border"
          style={{ borderColor: C.indigoDeep, color: C.indigoDeep }}
        >
          <ShieldCheck size={14} /> Admin login
        </button>
      </div>
    </div>
  );
}

function BottomNav({ page, setPage, cartCount }) {
  const items = [
    { key: "home", label: "Shop", icon: LayoutGrid },
    { key: "cart", label: "Cart", icon: ShoppingBag, badge: cartCount },
    { key: "tracking", label: "Track", icon: Package },
    { key: "account", label: "Account", icon: User },
  ];
  return (
    <div
      className="flex justify-around items-center py-2 border-t mt-auto"
      style={{ borderColor: "#EAE3D3", background: "white" }}
    >
      {items.map((it) => {
        const active =
          page === it.key || (it.key === "home" && page === "product");
        return (
          <button
            key={it.key}
            onClick={() => setPage(it.key)}
            className="flex flex-col items-center gap-0.5 px-3 relative"
          >
            <it.icon size={17} color={active ? C.indigoDeep : "#B0A890"} />
            {it.badge > 0 && (
              <span
                className="absolute -top-1 right-1 text-[8px] w-3.5 h-3.5 rounded-full text-white flex items-center justify-center"
                style={{ background: C.wine }}
              >
                {it.badge}
              </span>
            )}
            <span
              className="text-[9px]"
              style={{
                color: active ? C.indigoDeep : "#B0A890",
                fontWeight: active ? 600 : 400,
              }}
            >
              {it.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ================= ADMIN =================
function AdminShell(props) {
  const { page, adminAuthed, setAdminAuthed, setPage, exitAdmin } = props;
  if (!adminAuthed || page === "adminLogin") {
    return (
      <AdminLogin
        onLogin={() => {
          setAdminAuthed(true);
          setPage("adminHome");
        }}
        exitAdmin={exitAdmin}
      />
    );
  }
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {page === "adminHome" && <AdminDashboard {...props} />}
        {page === "adminProducts" && <AdminProducts {...props} />}
        {page === "adminOrders" && <AdminOrders {...props} />}
      </div>
      <AdminNav page={page} setPage={setPage} exitAdmin={exitAdmin} />
    </div>
  );
}

function AdminLogin({ onLogin, exitAdmin }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  return (
    <div
      className="h-full flex flex-col justify-center px-6 relative"
      style={{ background: C.indigoDeep }}
    >
      <TilePattern variant="diamond" color={C.gold} opacity={0.1} />
      <button
        onClick={exitAdmin}
        className="absolute top-4 left-4 text-white/70 text-xs flex items-center gap-1"
      >
        <ChevronLeft size={14} /> Back
      </button>
      <div className="relative">
        <ShieldCheck size={26} color={C.gold} />
        <h2
          className="text-white text-lg mt-2"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Admin sign in
        </h2>
        <p className="text-white/60 text-[11px] mt-0.5">
          Manage products, orders &amp; tracking
        </p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mt-4 px-3 py-2 rounded-lg text-xs outline-none bg-white/95"
        />
        <input
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full mt-2 px-3 py-2 rounded-lg text-xs outline-none bg-white/95"
        />
        <button
          onClick={onLogin}
          className="w-full mt-4 py-2.5 rounded-xl text-xs font-medium"
          style={{ background: C.gold, color: C.indigoDeep }}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }) {
  return (
    <div
      className="rounded-xl p-3 flex-1"
      style={{ background: "white", border: "1px solid #EAE3D3" }}
    >
      <Icon size={14} color={C.indigo} />
      <p className="text-base font-semibold mt-1" style={{ color: C.ink }}>
        {value}
      </p>
      <p className="text-[10px]" style={{ color: "#9A9282" }}>
        {label}
      </p>
    </div>
  );
}

function AdminDashboard({ products, orders, setPage }) {
  const pending = orders.filter((o) => o.status === "Pending").length;
  const revenue = orders.reduce((s, o) => s + o.total, 0);
  return (
    <div>
      <TopBar title="Admin Dashboard" />
      <div className="p-4">
        <div className="flex gap-2">
          <StatCard
            label="Products"
            value={products.length}
            icon={LayoutGrid}
          />
          <StatCard label="Orders" value={orders.length} icon={ClipboardList} />
        </div>
        <div className="flex gap-2 mt-2">
          <StatCard label="Pending" value={pending} icon={Clock} />
          <StatCard label="Revenue" value={naira(revenue)} icon={Truck} />
        </div>

        <p className="text-xs font-medium mt-5 mb-2" style={{ color: C.ink }}>
          Recent orders
        </p>
        <div className="space-y-2">
          {orders.slice(0, 4).map((o) => (
            <div
              key={o.id}
              className="flex justify-between items-center p-2.5 rounded-lg"
              style={{ background: "white", border: "1px solid #EAE3D3" }}
            >
              <div>
                <p className="text-[11px] font-mono" style={{ color: C.ink }}>
                  {o.id}
                </p>
                <p className="text-[10px]" style={{ color: "#9A9282" }}>
                  {o.customer}
                </p>
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: "#F1ECDD", color: C.indigo }}
              >
                {o.status}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setPage("adminOrders")}
          className="text-xs mt-3 flex items-center gap-1"
          style={{ color: C.indigo }}
        >
          View all orders <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
}

function AdminProducts({
  products,
  editingProduct,
  setEditingProduct,
  saveProduct,
  deleteProduct,
}) {
  return (
    <div>
      <TopBar
        title="Products"
        right={
          <button
            onClick={() =>
              setEditingProduct({
                id: null,
                name: "",
                category: "handbag",
                price: 0,
                stock: 0,
                blurb: "",
                pattern: "diamond",
                image: "",
              })
            }
            className="text-white flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full"
            style={{ background: C.gold, color: C.indigoDeep, fontWeight: 600 }}
          >
            <Plus size={12} /> Add
          </button>
        }
      />
      <div className="p-4 space-y-2.5">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex gap-2.5 items-center p-2.5 rounded-lg"
            style={{ background: "white", border: "1px solid #EAE3D3" }}
          >
            <div className="w-10 h-10 shrink-0">
              <ProductThumb product={p} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium" style={{ color: C.ink }}>
                {p.name}
              </p>
              <p className="text-[10px]" style={{ color: "#9A9282" }}>
                {naira(p.price)} · {p.stock} stock
              </p>
            </div>
            <button
              onClick={() => setEditingProduct(p)}
              style={{ color: C.indigo }}
            >
              <Edit3 size={14} />
            </button>
            <button
              onClick={() => deleteProduct(p.id)}
              style={{ color: C.wine }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {editingProduct && (
        <ProductEditor
          product={editingProduct}
          onCancel={() => setEditingProduct(null)}
          onSave={saveProduct}
        />
      )}
    </div>
  );
}

function ProductEditor({ product, onCancel, onSave }) {
  const [form, setForm] = useState(product);
  return (
    <div
      className="fixed inset-0 flex items-end justify-center z-30"
      style={{ background: "rgba(27,37,64,0.5)" }}
    >
      <div className="w-full max-w-[340px] bg-white rounded-t-2xl p-4 max-h-[85%] overflow-y-auto">
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs font-medium" style={{ color: C.ink }}>
            {product.id ? "Edit product" : "New product"}
          </p>
          <button onClick={onCancel}>
            <X size={16} color="#9A9282" />
          </button>
        </div>
        <div className="space-y-2">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Product name"
            className="w-full px-3 py-2 rounded-lg border text-xs"
            style={{ borderColor: "#D8D0BE" }}
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border text-xs"
            style={{ borderColor: "#D8D0BE" }}
          >
            <option value="handbag">Handbag</option>
            <option value="shoe">Shoe</option>
            <option value="veil">Veil</option>
          </select>
          <input
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
            placeholder="Price (₦)"
            className="w-full px-3 py-2 rounded-lg border text-xs"
            style={{ borderColor: "#D8D0BE" }}
          />
          <input
            type="number"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: Number(e.target.value) })
            }
            placeholder="Stock quantity"
            className="w-full px-3 py-2 rounded-lg border text-xs"
            style={{ borderColor: "#D8D0BE" }}
          />
          <input
            value={form.image || ""}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="Image URL (optional)"
            className="w-full px-3 py-2 rounded-lg border text-xs"
            style={{ borderColor: "#D8D0BE" }}
          />
          <textarea
            value={form.blurb}
            onChange={(e) => setForm({ ...form, blurb: e.target.value })}
            placeholder="Description"
            rows={2}
            className="w-full px-3 py-2 rounded-lg border text-xs"
            style={{ borderColor: "#D8D0BE" }}
          />
        </div>
        <button
          onClick={() => onSave(form)}
          className="w-full mt-3 py-2.5 rounded-xl text-white text-xs font-medium"
          style={{ background: C.indigoDeep }}
        >
          Save product
        </button>
      </div>
    </div>
  );
}

function AdminOrders({ orders, updateOrderStatus }) {
  return (
    <div>
      <TopBar title="Orders" />
      <div className="p-4 space-y-2.5">
        {orders.map((o) => (
          <div
            key={o.id}
            className="p-3 rounded-lg"
            style={{ background: "white", border: "1px solid #EAE3D3" }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-mono" style={{ color: C.ink }}>
                  {o.id}
                </p>
                <p className="text-xs mt-0.5" style={{ color: C.ink }}>
                  {o.customer}
                </p>
                <p className="text-[10px]" style={{ color: "#9A9282" }}>
                  {o.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}
                </p>
              </div>
              <p className="text-xs font-semibold" style={{ color: C.indigo }}>
                {naira(o.total)}
              </p>
            </div>
            <div className="flex gap-1 mt-2.5">
              {STATUS_STEPS.map((s) => (
                <button
                  key={s}
                  onClick={() => updateOrderStatus(o.id, s)}
                  className="px-2 py-0.5 rounded-full text-[9px]"
                  style={
                    o.status === s
                      ? { background: C.indigoDeep, color: "white" }
                      : { background: "#F1ECDD", color: C.indigo }
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminNav({ page, setPage, exitAdmin }) {
  const items = [
    { key: "adminHome", label: "Dashboard", icon: LayoutGrid },
    { key: "adminProducts", label: "Products", icon: Package },
    { key: "adminOrders", label: "Orders", icon: ClipboardList },
  ];
  return (
    <div
      className="flex justify-around items-center py-2 border-t mt-auto"
      style={{ borderColor: "#EAE3D3", background: "white" }}
    >
      {items.map((it) => {
        const active = page === it.key;
        return (
          <button
            key={it.key}
            onClick={() => setPage(it.key)}
            className="flex flex-col items-center gap-0.5 px-3"
          >
            <it.icon size={16} color={active ? C.indigoDeep : "#B0A890"} />
            <span
              className="text-[9px]"
              style={{
                color: active ? C.indigoDeep : "#B0A890",
                fontWeight: active ? 600 : 400,
              }}
            >
              {it.label}
            </span>
          </button>
        );
      })}
      <button
        onClick={exitAdmin}
        className="flex flex-col items-center gap-0.5 px-3"
      >
        <LogOut size={16} color="#B0A890" />
        <span className="text-[9px]" style={{ color: "#B0A890" }}>
          Exit
        </span>
      </button>
    </div>
  );
} */
