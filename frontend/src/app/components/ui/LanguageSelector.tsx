"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages, ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { useRouter, usePathname } from "@/navigation";

export default function LanguageSelector() {
  const [loaded, setLoaded] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  function setLocale(locale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: locale });
    });
  }
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!loaded) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none" asChild>
        <Button variant="ghost" className="dark:focus-visible:outline-none p-2 md:p-3">
          <Languages className="w-4 h-4 stroke-neutral-200" />
          <ChevronDown className="w-3 h-3 stroke-neutral-200 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => setLocale("en")}
          className={locale === "en" ? "bg-aquamarine-300" : ""}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLocale("es")}
          className={locale === "es" ? "bg-aquamarine-300" : ""}
        >
          Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
