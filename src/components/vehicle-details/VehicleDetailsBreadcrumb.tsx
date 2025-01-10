import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface VehicleDetailsBreadcrumbProps {
  title: string;
}

export const VehicleDetailsBreadcrumb = ({ title }: VehicleDetailsBreadcrumbProps) => {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-muted hover:text-primary transition-colors">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-muted" />
        <BreadcrumbItem>
          <BreadcrumbLink href="/carros" className="text-muted hover:text-primary transition-colors">
            Carros
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-muted" />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-primary font-medium">
            {title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};