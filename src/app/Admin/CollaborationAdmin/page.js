"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Input,
  Button,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  CardContent,
  Card,
  CardHeader,
  CardTitle,
  SelectTrigger,
  Select,
  SelectValue,
  SelectContent, SelectItem, FormControl, InputLabel, MenuItem,Tooltip
} from "@mui/material";

import { Download, Search, Filter, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import ResumeHeader from "./ResumeHeader";
import ApiConfig from "../../../Api"; // مسیر واقعی API
import Swal from "sweetalert2";
import moment from "jalali-moment";

export default function CollaborationAdmin() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(1)
  const [searchText, setSearchText] = useState("")

  const [filters, setFilters] = useState({
    Educational_status: "",
    favorits: "",
    military_status: "",
    sex: "",
    marital_status: "",
  })

  const tabs = [
    { id: 1, title: "دریافت شده" },
    { id: 2, title: "دیده شده" },
    { id: 4, title: "تایید شده" },
    { id: 3, title: "رد شده" },
  ]

  const columnLabels = {
    Educational_status: "مقطع تحصیلی",
    favorits: "علاقه",
    military_status: "وضعیت نظام وظیفه",
    sex: "جنسیت",
    marital_status: "وضعیت تاهل",
  }

  // --- خواندن داده از بک‌اند ---
  useEffect(() => {
    setLoading(true)
    ApiConfig.get("https://takbon.biz:3402/get_cv")
      .then((res) => {
        setNews(res.data.value || [])
      })
      .catch((err) => {
        console.error("خطا در دریافت داده‌ها:", err)
        Swal.fire("خطا", "دریافت داده‌ها از سرور ناموفق بود", "error")
      })
      .finally(() => setLoading(false))
  }, [])

  // ذخیره و بازیابی تب فعال
  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab")
    if (savedTab) setActiveTab(Number(savedTab))
  }, [])

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab.toString())
  }, [activeTab])

  const getUniqueValues = (key) => {
    return [...new Set(news.map((item) => item[key]).filter(Boolean))]
  }

  const getStateIcon = (state) => {
    switch (state) {
      case 1:
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 2:
        return <Eye className="w-4 h-4 text-blue-500" />
      case 3:
        return <XCircle className="w-4 h-4 text-red-500" />
      case 4:
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const clearAllFilters = () => {
    setFilters({
      Educational_status: "",
      favorits: "",
      military_status: "",
      sex: "",
      marital_status: "",
    })
    setSearchText("")
  }

  const hasActiveFilters = Object.values(filters).some((val) => val !== "") || searchText !== ""

  const filteredNews = news.filter((item) => {
    // فیلتر بر اساس تب فعال
    const matchesTab = activeTab === 1 ? true : item.state === activeTab

    // فیلتر بر اساس جستجو
    const matchesSearch =
      searchText === "" ||
      (item.name + " " + item.family + " " + item.phonenumber + " " + item.field)
        .toLowerCase()
        .includes(searchText.toLowerCase())

    // فیلتر بر اساس فیلترهای انتخاب شده
    const matchesFilters = Object.keys(filters).every((key) => {
      if (filters[key] === "") return true
      return item[key] === filters[key]
    })

    return matchesTab && matchesSearch && matchesFilters
  })

const handleStateChange = async (item, newStateId) => {
  // اگر تب 1 هست، مستقیم تغییر وضعیت اعمال شود
  const needsDownload = activeTab !== 1 && (!item.seen || item.state !== 2);

  if (needsDownload) {
    try {
      // اگر رزومه دیده نشده یا تب غیر 1 است، ابتدا mark as seen
      setNews(prevNews =>
        prevNews.map(n => (n._id === item._id ? { ...n, seen: true, state: 2 } : n))
      );
      await ApiConfig.post("/update_cv_state", {
        id: item._id,
        state: 2
      });
    } catch (err) {
      console.error("خطا در تغییر وضعیت رزومه:", err)
      Swal.fire("خطا", "ابتدا باید رزومه دانلود یا دیده شود.", "error");
      return;
    }
  }

  // پیغام تایید برای کاربر
  const result = await Swal.fire({
    title: "آیا مطمئن هستید؟",
    text: newStateId === 4 ? "می‌خواهید رزومه را تایید کنید؟" : "می‌خواهید رزومه را رد کنید؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "بله",
    cancelButtonText: "لغو",
  });

  if (!result.isConfirmed) return;

  const originalState = item.state;

  setNews(prevNews =>
    prevNews.map(n => (n._id === item._id ? { ...n, state: newStateId } : n))
  );

  try {
    await ApiConfig.post("https://takbon.biz:3402/get_cv", {
      ...item,
      state: newStateId,
    });
    Swal.fire("موفقیت‌آمیز", "وضعیت رزومه تغییر کرد.", "success");
  } catch (err) {
    console.error("خطا در تغییر وضعیت رزومه:", err);
    Swal.fire("خطا", "خطا در تغییر وضعیت رزومه.", "error");
    setNews(prevNews =>
      prevNews.map(n => (n._id === item._id ? { ...n, state: originalState } : n))
    );
  }
};


  const handleDownload = async (item) => {
    if (!item.seen || item.state !== 2) {
      try {
        setNews(prevNews =>
          prevNews.map(n => (n._id === item._id ? { ...n, seen: true, state: 2 } : n))
        )

        await ApiConfig.post("/update_cv_state", {
          id: item._id,
          state: 2
        })
      } catch (err) {
        console.error("خطا در تغییر وضعیت رزومه:", err)
      }
    }
  }

  return (
    <>
      <ResumeHeader tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <Card className="min-w-full text-right">
        <CardContent className="min-w-full text-right">
          <Table className="min-w-full text-right">
            <TableHead>

              <TableRow className="bg-muted/50">
                <TableCell className="text-right font-semibold">تاریخ</TableCell>
                <TableCell className="text-right font-semibold">نام و نام خانوادگی</TableCell>
                <TableCell className="text-right font-semibold">تلفن</TableCell>
                <TableCell className="text-right font-semibold">رشته</TableCell>
                <TableCell className="text-right font-semibold">وضعیت نظام وظیفه</TableCell>
                <TableCell className="text-right font-semibold">مقطع تحصیلی</TableCell>
                <TableCell className="text-right font-semibold">دانشگاه</TableCell>
                <TableCell className="text-right font-semibold">علاقه‌مندی</TableCell>
                <TableCell className="text-right font-semibold">جنسیت</TableCell>
                <TableCell className="text-right font-semibold">وضعیت تاهل</TableCell>
                <TableCell className="text-right font-semibold">تاریخ تولد</TableCell>
                <TableCell className="text-right font-semibold">آدرس</TableCell>
                <TableCell className="text-right font-semibold">وضعیت بررسی</TableCell>
                <TableCell className="text-right font-semibold"></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={14} className="text-center py-8">
                    در حال بارگذاری...
                  </TableCell>
                </TableRow>
              ) : filteredNews.length > 0 ? (
                filteredNews.map((item) => {
                  const shamsiDate = item.created_at
                    ? moment(item.created_at).locale("fa").format("YYYY/MM/DD HH:mm")
                    : "نامشخص";

                  const rowClass = item.seen
                    ? "bg-green-50 hover:bg-green-150 transition-colors text-right"
                    : "hover:bg-pink-50 transition-colors text-right";

                  return (
                    <TableRow key={item._id} className={rowClass}>
                      <TableCell className="text-right text-sm px-2">{shamsiDate}</TableCell>

                      <TableCell className="text-right font-medium flex items-center gap-1 px-2">
                        {getStateIcon(item.state || 1)}
                        {item.name} {item.family}
                      </TableCell>

                      <TableCell className="text-right text-sm px-2">{item.phonenumber}</TableCell>

                      <TableCell className="text-right text-sm px-2">
                        <Badge variant="outline">{item.field}</Badge>
                      </TableCell>

                      <TableCell className="text-right text-sm px-2">{item.military_status}</TableCell>
                      <TableCell className="text-right text-sm px-2">{item.Educational_status}</TableCell>
                      <TableCell className="text-right text-sm px-2">{item.university}</TableCell>

                      <TableCell className="text-right text-sm min-w-[150px] px-2">
                        {item.favorits
                          ? item.favorits.split(",").map((fav, index) => (
                            <div key={index}>{index + 1}. {fav.trim()}</div>
                          ))
                          : "-"}
                      </TableCell>

                      <TableCell className="text-right text-sm w-[80px] px-2">{item.sex}</TableCell>
                      <TableCell className="text-right text-sm px-2">{item.marital_status}</TableCell>
                      <TableCell className="text-right text-sm px-2">{item.birtday}</TableCell>
<TableCell className="text-right text-sm max-w-[150px] px-2">
  <Tooltip title={item.address || "-"} arrow placement="top">
    <span className="truncate block">{item.address || "-"}</span>
  </Tooltip>
</TableCell>
                      <TableCell className="text-right text-sm w-[100px] px-2">
                        <Select
                          value={(item.state || 1).toString()}
                          onChange={(e) => handleStateChange(item, Number(e.target.value))}
                          disabled={item.state !== 2}
                          size="small"
                          className="w-full"
                        >
                          <MenuItem value="1" disabled>دریافت شده</MenuItem>
                          <MenuItem value="4">تایید شده ✅</MenuItem>
                          <MenuItem value="3">رد شده ❌</MenuItem>
                        </Select>
                      </TableCell>

                      <TableCell className="text-right px-2">
                        {item.upload_file && (
                          <Button variant="outline" size="sm" onClick={() => handleDownload(item)}>
                            <a
                              href={`https://takbon.biz/cvdownloads/${item.upload_file}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              <Download className="w-4 h-4" />
                              دانلود
                            </a>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={14} className="text-center py-8">
                    هیچ رزومه‌ای یافت نشد
                  </TableCell>
                </TableRow>
              )}
            </TableBody>


          </Table>
        </CardContent>
      </Card>
    </>


  )
}