import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ExportDataModal } from "./ExportDataModal";
import { DeleteAccountModal } from "./DeleteAccountModal";

export function ActionSection() {
  return (
    <Card className="border-muted/40 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold">
          Account Actions
        </CardTitle>
        <CardDescription>
          Manage your account data and dangerous actions
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <ExportDataModal />
        <DeleteAccountModal />
      </CardContent>
    </Card>
  );
}