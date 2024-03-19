import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { UploadButton } from "@/lib/uploadthing";
import axios from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";

interface UploadFileButtonProps {
  conversationId: string;
}

const UploadFileButton = ({ conversationId }: UploadFileButtonProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const { toast } = useToast();

  const handleUpload = (url: string) => {
    axios
      .post("/api/messages", {
        image: url,
        conversationId: conversationId,
      })
      .then((res) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <UploadButton
        content={{
          button({ ready }) {
            return (
              <div className="transform animate-spin duration-300">
                <Plus size={24} className="text-zinc-500" />
              </div>
            );
          },
        }}
        endpoint="messageFile"
        appearance={{
          allowedContent: { display: "none" },
          button: {
            border: "none",
            background: "#fff",
            cursor: "pointer",
            height: "100%",
            width: "100%",
            justifyContent: "start",
          },
        }}
        className="w-fit"
        onUploadError={(err: Error) => {
          console.log(err);
        }}
        onUploadBegin={() => {
          toast({
            title: "Uploading image",
            description: "Wait a moment...",
            duration: 30000,
          });
        }}
        onClientUploadComplete={(res) => {
          toast({
            title: "Upload completed!",
            className: "bg-green-500",
            duration: 2000,
          });
          handleUpload(res[0].url);
        }}
      />
      <Toaster />
    </div>
  );
};

export default UploadFileButton;
