"use server"
import { Sheet } from "@mui/joy"
import MainContent from "./ui/MainContent";
import { getUser } from "../../internal/lib/dal";

type Props = {}
export default async function page({ }: Props) {
  
  const session = await getUser();

  return (
    <Sheet
      sx={{
        flex: 1,
        width: '100%',
        mx: 'auto',
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'minmax(min-content, min(30%, 400px)) 1fr',
        },
      }}
    >
      <MainContent session={session} />
    </Sheet>
  )
}