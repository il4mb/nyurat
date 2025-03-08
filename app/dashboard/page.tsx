"use server"

import { Box } from "@mui/material";
import { getUser } from "../../internal/lib/dal";

type Props = {}
export default async function page({ }: Props) {

  const session = await getUser();

  return (
    <>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        
      </Box>
    </>
  )
}