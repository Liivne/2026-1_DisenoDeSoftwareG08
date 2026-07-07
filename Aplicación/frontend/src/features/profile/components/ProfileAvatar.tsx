import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  Avatar,
  Button,
  Stack,
  Typography,
} from "@mui/material";

type ProfileAvatarProps = {
  name: string;
};

export default function ProfileAvatar({ name }: ProfileAvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <Stack spacing={2} alignItems="center">
      <Avatar
        sx={{
          width: 96,
          height: 96,
          bgcolor: "primary.main",
          fontSize: 36,
          fontWeight: 700,
        }}
      >
        {initial || <PersonOutlineIcon sx={{ fontSize: 48 }} />}
      </Avatar>

      <Typography variant="subtitle1" fontWeight={700}>
        {name}
      </Typography>

      <Button
        variant="outlined"
        startIcon={<PhotoCameraOutlinedIcon />}
      >
        Cambiar foto
      </Button>
    </Stack>
  );
}