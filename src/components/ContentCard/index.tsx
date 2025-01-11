// import { Card, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"; 
// import { Button } from "@/components/ui/button"; 
// import { Star, Tv } from "lucide-react";
// import { IMidiaContent } from "@/constants/movies";

// interface ContentProps {
//   id: string;
//   title: string;
//   image: string;
//   year: string;
//   type: string;
//   savedItems: IMidiaContent[];  
//   onSave: (item: IMidiaContent) => void;  
//   onRemove: (item: IMidiaContent) => void;  
// }

// export const ContentCard = ({
//   id,
//   title,
//   image,
//   year,
//   type,
//   savedItems,
//   onSave,
//   onRemove,
// }: ContentProps) => {
//   const isSaved = savedItems.some((item) => item.id === id);

//   return (
//     <Card key={id} className="relative dark:bg-slate-900 rounded-md shadow-md overflow-hidden w-fit">
//       <div className="absolute right-2 top-2 flex flex-row gap-2">
//         <Button
//           variant="outline"
//           className="group cursor-pointer transition-colors duration-300 w-8 h-8"
//           size="icon"
//           onClick={() => (isSaved ? onRemove({ id, title, image, year, type }) : onSave({ id, title, image, year, type }))}
//         >
//           <Star
//             className={`cursor-pointer transition-colors duration-300 ${isSaved ? "fill-yellow-300" : "text-gray-400"}`}
//           />
//         </Button>
//         <Button
//           variant="outline"
//           className="group cursor-pointer transition-colors duration-300 w-8 h-8"
//           size="icon"
//         >
//           <Tv className="text-gray-400 group-hover:fill-sky-300 transition-colors duration-300" />
//         </Button>
//       </div>
//       <CardContent className="h-[250px] sm:h-[300px] md:h-[400px] aspect-[2/3] p-0 pb-2">
//         <img
//           src={image}
//           alt="Card Image"
//           className="w-full h-full object-cover mx-auto"
//         />
//       </CardContent>
//       <CardFooter className="flex flex-col w-64 items-start pb-2 px-2 overflow-hidden">
//         <CardTitle className="text-lg font-medium break-words whitespace-normal">
//           {title}
//         </CardTitle>
//         <CardDescription className="text-gray-600 dark:text-gray-400 flex flex-row gap-2 mt-2">
//           <p>
//             <span className="text-primary">Year: </span>
//             {year}
//           </p>
//           <p>
//             <span className="text-primary">Type: </span>
//             {type}
//           </p>
//         </CardDescription>
//       </CardFooter>
//     </Card>
//   );
// };
