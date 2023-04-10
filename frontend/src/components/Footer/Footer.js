import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Paper
      square
      component="footer"
      variant="outlined"
      sx={{
        width: "100%",
        marginTop: "10%",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 1,
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" color="initial">
            Made with ❤️ by Amal Salah.
          </Typography>
        </Box>

        <Box
          sx={{
            mb: 2,
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" color="initial">
            Copyright ©2023. Built with React.
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
}
