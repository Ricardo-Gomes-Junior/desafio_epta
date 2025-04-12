import check from "../assets/check.png";
import circle from "../assets/circle.png";
import data from "../assets/data.png";

interface CardProps {
  nome: string;
  total: number;
  imageType: "check" | "inactive" | "active";
}

export function Card({ nome, total, imageType }: CardProps) {
  return (
    <div className="flex h-[100px] w-[300px] items-center rounded-xl p-4 shadow-md">
      <div className="">
        {imageType === "check" && (
          <img src={data} alt="" className="h-15 w-15 justify-center" />
        )}
        {imageType === "active" && (
          <img src={check} alt="" className="h-15 w-15 justify-center" />
        )}
        {imageType === "inactive" && (
          <img src={circle} alt="" className="h-15 w-15 justify-center" />
        )}
      </div>
      <div className="flex flex-col pl-5">
        <h1 className="text-sm text-gray-400">{nome}</h1>
        <h2 className="text-3xl font-bold">{total}</h2>
      </div>
    </div>
  );
}
