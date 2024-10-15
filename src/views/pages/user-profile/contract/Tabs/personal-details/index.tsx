import { useState } from "react";
import { Grid, Paper, MenuList, MenuItem, ListItemText, ListItemIcon } from "@mui/material";
import IssueIcon from "@/components/IssueIcon";
import TabsContainer from "./TapsCont"; // Import child component
import { TabEnum } from "./Taps"
function PersonalDetails() {
  const [tab, setTab] = useState<TabEnum>(TabEnum.personalDetailsTap); // Control active tab

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper>
          <MenuList>
            <MenuItem onClick={() => setTab(TabEnum.personalDetailsTap)}>
                <ListItemText>البيانات الشخصية</ListItemText>
              <ListItemIcon><IssueIcon /></ListItemIcon>
            </MenuItem>
            <MenuItem onClick={() => setTab(TabEnum.BankingInformationTap)}>
              <ListItemText>المعلومات البنكية</ListItemText>
              <ListItemIcon><IssueIcon /></ListItemIcon>
            </MenuItem>
            <MenuItem onClick={() => setTab(TabEnum.ContactInformationTap)}>
              <ListItemText>معلومات الاتصال</ListItemText>
              <ListItemIcon><IssueIcon /></ListItemIcon>
            </MenuItem>
          </MenuList>
        </Paper>
      </Grid>

      <Grid item xs={9}>
        <TabsContainer activeTab={tab} />
      </Grid>
    </Grid>
  );
}

export default PersonalDetails;
