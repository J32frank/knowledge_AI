import Image from "next/image";

function Loading({ loading }) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
      <Image src="/loader.gif" alt="Loading" width={100} height={100} />
    </div>
  );
}

export default Loading;
