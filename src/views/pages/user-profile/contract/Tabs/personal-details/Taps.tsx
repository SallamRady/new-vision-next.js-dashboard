import { Paper, Stack } from "@mui/material";
import BankingInformationTap from "./BankingInformationTap/index"
import ContactInformationTap from "./ContactInformationTap/index"
import PersonalDetails from "./personalDetailsTap/Index";
export enum TabEnum {
  personalDetailsTap = "personalDetailsTap",
  BankingInformationTap = "BankingInformationTap",
  ContactInformationTap = "ContactInformationTap",
}


export default function TabViews({ tab }: { tab: TabEnum }) {
  switch (tab) {
    case TabEnum.personalDetailsTap:
      return (
          <PersonalDetails />
        );
        case TabEnum.BankingInformationTap:
          return (
        <BankingInformationTap />

      );
      case TabEnum.ContactInformationTap:
        return (
        <ContactInformationTap />
      );
    default:
      return null;
  }
}




