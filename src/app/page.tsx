import UploadFileDialog from "@/components/UploadFileDialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto pt-12 ">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Your files</h1>
        <UploadFileDialog trigger={<Button>Upload file</Button>} />
      </div>
    </main>
  );
}
