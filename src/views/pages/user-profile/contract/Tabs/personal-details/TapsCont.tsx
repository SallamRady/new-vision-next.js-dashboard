import { Paper, Stack } from "@mui/material";
import TabViews, { TabEnum } from "./Taps"; // Fixed the import statement

export  interface TabsContainerProps {
  activeTab: TabEnum;
}

function TabsContainer({ activeTab }: TabsContainerProps) {
  return (
    <Stack spacing={1}>
      <Paper elevation={3} style={{background: "transparent" }}>
        <TabViews tab={activeTab} />
      </Paper>
    </Stack>
  );
}

export default TabsContainer;
