"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // برای Next.js 13+
import ApiConfig from "../../../Api";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { status, data } = await ApiConfig.post(
        "https://takbon.biz:3402/login",
        { username, password }
      );

      console.log("resp:", status, data);
      if (status === 200 && data.result) {
        const { token, ...user } = data.value;
        localStorage.setItem("access_token", token);
        localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/Admin/dashboard");
      } else {
        setError("نام کاربری یا رمز عبور اشتباه است.");
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="...">
      <form onSubmit={handleLogin} dir="rtl" className="space-y-5">
        {error && <div className="...">{error}</div>}
        <div className="...">
          <input
            type="text"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            className="..."
          />
        </div>
        <div className="...">
          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="..."
          />
        </div>
   
        <button
          disabled={loading}
          type="submit"
          className="..."
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
        <div className="text-center">
          <Link href="/">
            ← بازگشت به صفحه نخست
          </Link>
        </div>
      </form>
    </main>
  );
}
