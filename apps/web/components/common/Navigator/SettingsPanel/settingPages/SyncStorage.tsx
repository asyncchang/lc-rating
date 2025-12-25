import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useSiteStorage } from "@/hooks/useSiteStorage";
import { Copy, Download, HeartCrack, ThumbsUp, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { toast } from "sonner";

export default function SyncStorage() {
  const { siteStorage, setSiteStorage } = useSiteStorage();
  const progressStr = JSON.stringify(siteStorage, null, 2);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      progressData: "",
    },
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(progressStr);
    toast(<span className="text-green-500">複製成功</span>, {
      icon: <ThumbsUp className="text-green-500 size-full" />,
    });
  };

  const handleDownload = () => {
    const blob = new Blob([progressStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `site-data-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast(<span className="text-green-500">下載成功</span>, {
      icon: <ThumbsUp className="text-green-500 size-full" />,
    });
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        setSiteStorage(parsedData);
        toast(<span className="text-green-500">上傳成功</span>, {
          icon: <ThumbsUp className="text-green-500 size-full" />,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Error parsing file:", error);
        toast(<span className="text-red-500">文件格式錯誤</span>, {
          icon: <HeartCrack className="text-red-500 size-full" />,
        });
      }
    };
    reader.readAsText(file);
  };

  const onSubmit = (data: { progressData: string }) => {
    try {
      const parsedData = JSON.parse(data.progressData);
      setSiteStorage(parsedData);
      toast(<span className="text-green-500">保存成功</span>, {
        icon: <ThumbsUp className="text-green-500 size-full" />,
      });
    } catch (error) {
      console.error("Error setting progress:", error);
      toast(<span className="text-red-500">保存失敗</span>, {
        icon: <HeartCrack className="text-red-500 size-full" />,
      });
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {progressStr && (
            <div className="space-y-2">
              <div className="relative">
                <Textarea
                  readOnly
                  rows={5}
                  value={progressStr}
                  className="resize-none field-sizing-fixed"
                />
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute top-1 right-5 h-8 w-8"
                  onClick={handleCopy}
                  type="button"
                >
                  <Copy />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleDownload}
                  type="button"
                >
                  <Download className="mr-2 h-4 w-4" />
                  下載數據
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleUpload}
                  type="button"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  上傳數據
                </Button>
              </div>
            </div>
          )}
          <FormField
            control={form.control}
            name="progressData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>輸入站點數據:</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={5}
                    className="resize-none field-sizing-fixed"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            導入站點數據
          </Button>
        </form>
      </Form>
    </div>
  );
}