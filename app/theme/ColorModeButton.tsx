import { Button, SxProps, Typography, useColorScheme, useTheme } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

type Variant = "text" | "outlined" | "contained";
const ColorModeButton = ({ text, sx, variant = "outlined" }: { text?: string, sx?: SxProps, variant?: Variant }) => {
  const theme = useTheme();
  const colorMode = theme.palette.mode;
  const { mode, systemMode, setMode } = useColorScheme();
  const resolvedMode = (systemMode || mode) as "light" | "dark";
  const icon = {
    light: <LightMode />,
    dark: <DarkMode />,
  }[resolvedMode];

  const handleToggleMode = () => {
    setMode(colorMode === "light" ? "dark" : "light");
  };

  return (
    <Button
      onClick={handleToggleMode}
      variant={variant}
      color="inherit"
      disableRipple
      size="small"
      sx={sx}
    >
      {(text && (
        <>
          <Typography variant="subtitle2" component={"span"} sx={{ mr: 1 }}>{text}</Typography>
          {icon}
        </>
      )) ||
        icon}
    </Button>
  );
};

export default ColorModeButton;
