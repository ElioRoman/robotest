"use client";
import { Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button onClick={() => router.push("/login")} variant="contained">
        Let's Start
      </Button>
    </Box>
  );
};

export default Home;
