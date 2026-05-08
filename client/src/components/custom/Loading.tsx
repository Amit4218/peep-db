import { Loader } from "lucide-react";

function Loading() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <Loader
          size={35}
          className="animate-spin text-foreground duration-200"
        />
      </div>
    </>
  );
}

export default Loading;
