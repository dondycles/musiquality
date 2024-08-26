import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import ArrangerBar from "./arranger-bar";

export default function TopArrangers() {
  return (
    <Card className="shadow-none border-none">
      <CardHeader className="p-0">
        <CardTitle className="none">
          <div className="grid grid-cols-[24px,1fr] gap-1">
            <MdOutlineLocalFireDepartment size={24} className="m-auto" />
            <p className="my-auto">Top Arrangers</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 mt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-5 w-full h-fit gap-2">
          {Array.from({ length: 10 }).map((_, index) => (
            <ArrangerBar key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
