import Image from "./Image.jsx";

export default function BookImg({book,index=0,className=null}) {
  if (!book.photos?.length) {
    return '';
  }
  if (!className) {
    className = 'object-cover';
  }
  return (
    <Image className={className} src={book.photos[index]} alt=""/>
  );
}