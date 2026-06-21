import { useState } from "react";
import { toast } from "sonner";
import {
  TextB,
  TextItalic,
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  Gear,
  House,
  Copy,
  Trash,
  PencilSimple,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaTrendChart,
  ComparisonBarChart,
  MultiLineChart,
  DistributionDonutChart,
  StackedAreaChart,
  RadialChart,
} from "@/components/charts";
import { PAGE } from "@/lib/layout";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ButtonGroup } from "@/components/ui/button-group";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Spinner } from "@/components/ui/spinner";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { CalendarBlank, Check, CaretUpDown, FolderOpen, At } from "@phosphor-icons/react";

function ShowcaseCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardDescription className="text-[11px] font-mono uppercase tracking-wider">
          {title}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">{children}</CardContent>
    </Card>
  );
}

const TREND = [
  { label: "Jan", value: 28 },
  { label: "Feb", value: 31 },
  { label: "Mar", value: 29 },
  { label: "Apr", value: 35 },
  { label: "May", value: 39 },
  { label: "Jun", value: 43 },
];
const BARS = [
  { label: "Q1", desktop: 120, mobile: 80 },
  { label: "Q2", desktop: 150, mobile: 110 },
  { label: "Q3", desktop: 170, mobile: 140 },
  { label: "Q4", desktop: 210, mobile: 180 },
];
const LINES = [
  { label: "Mon", p50: 42, p95: 120 },
  { label: "Tue", p50: 38, p95: 98 },
  { label: "Wed", p50: 45, p95: 130 },
  { label: "Thu", p50: 40, p95: 110 },
  { label: "Fri", p50: 36, p95: 92 },
];
const DONUT = [
  { key: "a", label: "Widget Pro", value: 4200 },
  { key: "b", label: "Gadget Lite", value: 3100 },
  { key: "c", label: "Module X", value: 2200 },
];

const SECTIONS = [
  { id: "actions", label: "Actions", keywords: ["button", "toggle"] },
  { id: "inputs", label: "Inputs", keywords: ["input", "textarea", "select", "checkbox", "switch", "slider", "label", "radio"] },
  { id: "dataviz", label: "Data Viz", keywords: ["chart", "area", "bar", "line", "donut", "graph"] },
  { id: "display", label: "Display", keywords: ["card", "badge", "avatar", "separator", "skeleton", "progress", "table", "scroll"] },
  { id: "overlay", label: "Overlay", keywords: ["dialog", "popover", "tooltip", "dropdown", "menu", "sheet", "drawer", "context", "alert"] },
  { id: "navigation", label: "Navigation", keywords: ["accordion", "tabs", "breadcrumb", "collapsible"] },
  { id: "feedback", label: "Feedback", keywords: ["alert", "toast", "sonner", "spinner", "empty"] },
  { id: "datetime", label: "Date & Pickers", keywords: ["calendar", "date", "combobox", "command", "otp", "picker"] },
  { id: "catalog", label: "Layout & Catalog", keywords: ["menubar", "navigation", "pagination", "carousel", "resizable", "aspect", "kbd", "hover", "item", "group", "button group", "input group"] },
];

function PrimitivesWorkspace() {
  const [filter, setFilter] = useState("");
  const lc = filter.toLowerCase();
  const visible = lc
    ? SECTIONS.filter(
        (s) => s.keywords.some((k) => k.includes(lc)) || s.label.toLowerCase().includes(lc)
      )
    : SECTIONS;
  const show = (id: string) => visible.some((s) => s.id === id);

  return (
    <div className="overflow-y-auto">
      <Toaster />
      <div className={PAGE}>
        <header className="mb-8">
          <p
            className="text-[11px] font-mono uppercase tracking-widest mb-2"
            style={{ color: "var(--bl-fill-primary)" }}
          >
            Primitives
          </p>
          <h1
            className="text-3xl font-heading font-medium mb-2"
            style={{ color: "var(--bl-fg-primary)" }}
          >
            UI Primitives
          </h1>
          <p className="text-[14px] mb-4" style={{ color: "var(--bl-fg-secondary)" }}>
            Atomic components from shadcn/ui plus Recharts data-viz, all branded
            with{" "}
            <code
              className="text-[12px] px-1 py-0.5 rounded"
              style={{ backgroundColor: "var(--bl-bg-elevated)" }}
            >
              --bl-*
            </code>{" "}
            tokens. Every higher-level component composes from these.
          </p>
          <Input
            type="text"
            placeholder="Filter primitives..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-sm"
            aria-label="Filter primitives"
          />
        </header>

        <div className="space-y-12">
          {/* Actions */}
          {show("actions") && (
            <section>
              <SectionHeading>Actions</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ShowcaseCard title="Button -variants">
                  <div className="flex flex-wrap gap-2">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Button -sizes">
                  <div className="flex items-center gap-2">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon" aria-label="Settings">
                      <Gear size={16} weight="bold" />
                    </Button>
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Toggle">
                  <div className="flex items-center gap-2">
                    <Toggle aria-label="Toggle bold">
                      <TextB size={16} />
                    </Toggle>
                    <Toggle aria-label="Toggle italic">
                      <TextItalic size={16} />
                    </Toggle>
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Toggle Group">
                  <ToggleGroup type="single" defaultValue="left">
                    <ToggleGroupItem value="left" aria-label="Align left">
                      <TextAlignLeft size={16} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="center" aria-label="Align center">
                      <TextAlignCenter size={16} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="right" aria-label="Align right">
                      <TextAlignRight size={16} />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </ShowcaseCard>
              </div>
            </section>
          )}

          {/* Inputs */}
          {show("inputs") && (
            <section>
              <SectionHeading>Inputs</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ShowcaseCard title="Input">
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="demo-email">Email</Label>
                      <Input id="demo-email" type="email" placeholder="you@example.com" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="demo-disabled">Disabled</Label>
                      <Input id="demo-disabled" disabled placeholder="Cannot edit" />
                    </div>
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Textarea">
                  <div className="space-y-1.5">
                    <Label htmlFor="demo-textarea">Message</Label>
                    <Textarea id="demo-textarea" placeholder="Type something..." />
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Select">
                  <div className="space-y-1.5">
                    <Label>Framework</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a framework" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="vue">Vue</SelectItem>
                        <SelectItem value="svelte">Svelte</SelectItem>
                        <SelectItem value="solid">Solid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Radio Group">
                  <RadioGroup defaultValue="comfortable">
                    {[
                      { v: "default", l: "Default" },
                      { v: "comfortable", l: "Comfortable" },
                      { v: "compact", l: "Compact" },
                    ].map((o) => (
                      <div key={o.v} className="flex items-center gap-2">
                        <RadioGroupItem value={o.v} id={`r-${o.v}`} />
                        <Label htmlFor={`r-${o.v}`} className="text-sm font-normal">
                          {o.l}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </ShowcaseCard>
                <ShowcaseCard title="Checkbox & Switch">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm">
                        Accept terms and conditions
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="notifications" />
                      <Label htmlFor="notifications" className="text-sm">
                        Enable notifications
                      </Label>
                    </div>
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Slider">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label>Volume</Label>
                      <Slider defaultValue={[65]} max={100} step={1} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Range</Label>
                      <Slider defaultValue={[25, 75]} max={100} step={1} />
                    </div>
                  </div>
                </ShowcaseCard>
              </div>
            </section>
          )}

          {/* Data Viz */}
          {show("dataviz") && (
            <section>
              <SectionHeading>Data Viz</SectionHeading>
              <p className="text-[13px] -mt-2 mb-4" style={{ color: "var(--bl-fg-muted)" }}>
                Recharts wrapped in a tokenized ChartContainer. Hover any chart -
                tooltips and active states are baked in.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ShowcaseCard title="Area -trend">
                  <AreaTrendChart data={TREND} seriesLabel="Revenue ($k)" className="h-[200px] w-full" />
                </ShowcaseCard>
                <ShowcaseCard title="Bar -comparison">
                  <ComparisonBarChart
                    data={BARS}
                    series={[
                      { key: "desktop", label: "Desktop" },
                      { key: "mobile", label: "Mobile" },
                    ]}

                    className="h-[200px] w-full"
                  />
                </ShowcaseCard>
                <ShowcaseCard title="Line -multi-series">
                  <MultiLineChart
                    data={LINES}
                    series={[
                      { key: "p50", label: "p50" },
                      { key: "p95", label: "p95" },
                    ]}
                    className="h-[200px] w-full"
                  />
                </ShowcaseCard>
                <ShowcaseCard title="Donut -distribution">
                  <DistributionDonutChart data={DONUT} centerLabel="Revenue" className="h-[200px] w-full" />
                </ShowcaseCard>
                <ShowcaseCard title="Stacked area -composition">
                  <StackedAreaChart
                    data={[
                      { label: "Jan", organic: 120, paid: 80, referral: 40 },
                      { label: "Feb", organic: 140, paid: 95, referral: 52 },
                      { label: "Mar", organic: 155, paid: 110, referral: 48 },
                      { label: "Apr", organic: 170, paid: 90, referral: 65 },
                      { label: "May", organic: 195, paid: 125, referral: 58 },
                      { label: "Jun", organic: 210, paid: 140, referral: 72 },
                    ]}
                    series={[
                      { key: "organic", label: "Organic" },
                      { key: "paid", label: "Paid" },
                      { key: "referral", label: "Referral" },
                    ]}
                    className="h-[200px] w-full"
                  />
                </ShowcaseCard>
                <ShowcaseCard title="Radial -progress">
                  <RadialChart
                    data={[
                      { key: "revenue", label: "Revenue", value: 78, max: 100 },
                      { key: "users", label: "Users", value: 62, max: 100 },
                      { key: "retention", label: "Retention", value: 91, max: 100 },
                    ]}
                    className="h-[200px] w-full"
                  />
                </ShowcaseCard>
              </div>
            </section>
          )}

          {/* Display */}
          {show("display") && (
            <section>
              <SectionHeading>Display</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ShowcaseCard title="Card">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Stat Card</CardTitle>
                      <CardDescription>Monthly revenue</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-heading font-semibold">$42,580</p>
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm text-muted-foreground">+12.5% from last month</p>
                    </CardFooter>
                  </Card>
                </ShowcaseCard>
                <ShowcaseCard title="Badge">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Avatar">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>BL</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>TS</AvatarFallback>
                    </Avatar>
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Separator & Progress">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm mb-2">Progress -65%</p>
                      <Progress value={65} />
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm mb-2">Progress -30%</p>
                      <Progress value={30} />
                    </div>
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Skeleton">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[200px]" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Scroll Area">
                  <ScrollArea className="h-32 w-full rounded-md border p-3">
                    <div className="space-y-2">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <p key={i} className="text-sm" style={{ color: "var(--bl-fg-secondary)" }}>
                          Item {i + 1} -scrollable region
                        </p>
                      ))}
                    </div>
                  </ScrollArea>
                </ShowcaseCard>
                <ShowcaseCard title="Table">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Widget Pro</TableCell>
                        <TableCell><Badge variant="secondary">Active</Badge></TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Gadget Lite</TableCell>
                        <TableCell><Badge variant="outline">Draft</Badge></TableCell>
                        <TableCell className="text-right">$150.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ShowcaseCard>
              </div>
            </section>
          )}

          {/* Overlay */}
          {show("overlay") && (
            <section>
              <SectionHeading>Overlay</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ShowcaseCard title="Dialog">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </ShowcaseCard>
                <ShowcaseCard title="Alert Dialog">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This permanently deletes your account and removes your data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </ShowcaseCard>
                <ShowcaseCard title="Sheet">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">Open Sheet</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Panel</SheetTitle>
                        <SheetDescription>
                          A side sheet slides in from the edge -good for filters or detail.
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </ShowcaseCard>
                <ShowcaseCard title="Drawer">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button variant="outline">Open Drawer</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Drawer</DrawerTitle>
                        <DrawerDescription>
                          A bottom drawer -good for mobile-first actions.
                        </DrawerDescription>
                      </DrawerHeader>
                      <DrawerFooter>
                        <Button>Confirm</Button>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </ShowcaseCard>
                <TooltipProvider>
                  <ShowcaseCard title="Tooltip">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">Hover me</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This is a tooltip</p>
                      </TooltipContent>
                    </Tooltip>
                  </ShowcaseCard>
                </TooltipProvider>
                <ShowcaseCard title="Popover">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72">
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Dimensions</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="width" className="text-xs">Width</Label>
                            <Input id="width" defaultValue="100%" />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="height" className="text-xs">Height</Label>
                            <Input id="height" defaultValue="auto" />
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </ShowcaseCard>
                <ShowcaseCard title="Dropdown Menu">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Open Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <PencilSimple size={14} className="mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy size={14} className="mr-2" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash size={14} className="mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </ShowcaseCard>
                <ShowcaseCard title="Context Menu">
                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <div
                        className="flex h-20 items-center justify-center rounded-md border border-dashed text-sm"
                        style={{ color: "var(--bl-fg-muted)" }}
                      >
                        Right-click here
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem>
                        <Copy size={14} className="mr-2" /> Copy
                      </ContextMenuItem>
                      <ContextMenuItem>
                        <PencilSimple size={14} className="mr-2" /> Rename
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem>
                        <Trash size={14} className="mr-2" /> Delete
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </ShowcaseCard>
              </div>
            </section>
          )}

          {/* Navigation */}
          {show("navigation") && (
            <section>
              <SectionHeading>Navigation</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ShowcaseCard title="Tabs">
                  <Tabs defaultValue="overview">
                    <TabsList>
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="activity">Activity</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="text-sm pt-3" style={{ color: "var(--bl-fg-secondary)" }}>
                      A high-level summary of your workspace.
                    </TabsContent>
                    <TabsContent value="activity" className="text-sm pt-3" style={{ color: "var(--bl-fg-secondary)" }}>
                      Recent events and changes.
                    </TabsContent>
                    <TabsContent value="settings" className="text-sm pt-3" style={{ color: "var(--bl-fg-secondary)" }}>
                      Configure preferences here.
                    </TabsContent>
                  </Tabs>
                </ShowcaseCard>
                <ShowcaseCard title="Breadcrumb">
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">
                          <House size={13} className="inline mr-1" />
                          Home
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Components</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </ShowcaseCard>
                <ShowcaseCard title="Accordion">
                  <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What is the token system?</AccordionTrigger>
                      <AccordionContent>
                        Design decisions mapped to --bl-* CSS variables. Components
                        consume semantic tokens, never raw values.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How does dark mode work?</AccordionTrigger>
                      <AccordionContent>
                        Dark is ground truth; light overrides via [data-mode="light"].
                        Both values are required for every token.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </ShowcaseCard>
                <ShowcaseCard title="Collapsible">
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        Toggle details
                        <span aria-hidden>⌄</span>
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2 text-sm" style={{ color: "var(--bl-fg-secondary)" }}>
                      <div className="rounded-md border p-3">
                        Hidden content revealed on demand -progressive disclosure.
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </ShowcaseCard>
              </div>
            </section>
          )}

          {/* Feedback */}
          {show("feedback") && (
            <section>
              <SectionHeading>Feedback</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ShowcaseCard title="Alert -Default">
                  <Alert>
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                      You can add components to your app using the CLI.
                    </AlertDescription>
                  </Alert>
                </ShowcaseCard>
                <ShowcaseCard title="Alert -Destructive">
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Your session has expired. Please log in again.
                    </AlertDescription>
                  </Alert>
                </ShowcaseCard>
                <ShowcaseCard title="Toast (Sonner)">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      onClick={() =>
                        toast.success("Changes saved", {
                          description: "Your workspace was updated.",
                        })
                      }
                    >
                      Success toast
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        toast.error("Something went wrong", {
                          description: "Please try again.",
                        })
                      }
                    >
                      Error toast
                    </Button>
                  </div>
                </ShowcaseCard>
              </div>
            </section>
          )}

          {/* Date & Pickers */}
          {show("datetime") && (
            <section>
              <SectionHeading>Date &amp; Pickers</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ShowcaseCard title="Calendar">
                  <CalendarDemo />
                </ShowcaseCard>
                <ShowcaseCard title="Date Picker">
                  <DatePickerDemo />
                </ShowcaseCard>
                <ShowcaseCard title="Combobox">
                  <ComboboxDemo />
                </ShowcaseCard>
                <ShowcaseCard title="Command">
                  <Command className="rounded-lg border" style={{ borderColor: "var(--bl-border-divider)" }}>
                    <CommandInput placeholder="Type a command..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        <CommandItem>Dashboard</CommandItem>
                        <CommandItem>Markets</CommandItem>
                        <CommandItem>Settings</CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </ShowcaseCard>
                <ShowcaseCard title="Input OTP">
                  <OtpDemo />
                </ShowcaseCard>
              </div>
            </section>
          )}

          {/* Layout & Catalog */}
          {show("catalog") && (
            <section>
              <SectionHeading>Layout &amp; Catalog</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ShowcaseCard title="Button Group">
                  <ButtonGroup>
                    <Button variant="outline">Day</Button>
                    <Button variant="outline">Week</Button>
                    <Button variant="outline">Month</Button>
                  </ButtonGroup>
                </ShowcaseCard>
                <ShowcaseCard title="Input Group">
                  <InputGroup>
                    <InputGroupAddon>
                      <Gear size={15} />
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Search settings..." />
                  </InputGroup>
                </ShowcaseCard>
                <ShowcaseCard title="Menubar">
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger>File</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>New <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
                        <MenubarItem>Open</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Export</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>Edit</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>Undo</MenubarItem>
                        <MenubarItem>Redo</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </ShowcaseCard>
                <ShowcaseCard title="Navigation Menu">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-[260px] gap-1 p-2">
                            <NavigationMenuLink className="rounded-md px-2 py-1.5 text-sm">Analytics</NavigationMenuLink>
                            <NavigationMenuLink className="rounded-md px-2 py-1.5 text-sm">Wallets</NavigationMenuLink>
                            <NavigationMenuLink className="rounded-md px-2 py-1.5 text-sm">Exchange</NavigationMenuLink>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </ShowcaseCard>
                <ShowcaseCard title="Pagination">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                      <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                      <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                      <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                      <PaginationItem><PaginationEllipsis /></PaginationItem>
                      <PaginationItem><PaginationNext href="#" /></PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </ShowcaseCard>
                <ShowcaseCard title="Hover Card">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link" className="gap-1"><At size={14} />baseline</Button>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <p className="text-sm font-medium">Baseline Studio</p>
                      <p className="text-xs text-muted-foreground">The composable design system. Joined June 2026.</p>
                    </HoverCardContent>
                  </HoverCard>
                </ShowcaseCard>
                <ShowcaseCard title="Carousel">
                  <Carousel className="w-full max-w-[240px] mx-auto">
                    <CarouselContent>
                      {[1, 2, 3].map((n) => (
                        <CarouselItem key={n}>
                          <div className="flex h-24 items-center justify-center rounded-lg border text-2xl font-heading font-bold" style={{ borderColor: "var(--bl-border-divider)" }}>
                            {n}
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </ShowcaseCard>
                <ShowcaseCard title="Resizable">
                  <ResizablePanelGroup direction="horizontal" className="h-28 rounded-lg border" style={{ borderColor: "var(--bl-border-divider)" }}>
                    <ResizablePanel defaultSize={50}>
                      <div className="flex h-full items-center justify-center text-sm">One</div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={50}>
                      <div className="flex h-full items-center justify-center text-sm">Two</div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ShowcaseCard>
                <ShowcaseCard title="Aspect Ratio">
                  <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden" style={{ backgroundColor: "var(--bl-bg-elevated)" }}>
                    <div className="flex h-full items-center justify-center text-xs font-mono" style={{ color: "var(--bl-fg-muted)" }}>16 / 9</div>
                  </AspectRatio>
                </ShowcaseCard>
                <ShowcaseCard title="Kbd & Spinner">
                  <div className="flex items-center gap-4">
                    <KbdGroup>
                      <Kbd>⌘</Kbd>
                      <Kbd>K</Kbd>
                    </KbdGroup>
                    <Spinner />
                  </div>
                </ShowcaseCard>
                <ShowcaseCard title="Item">
                  <Item variant="outline">
                    <ItemMedia>
                      <Avatar className="h-9 w-9"><AvatarFallback className="text-[11px]">BL</AvatarFallback></Avatar>
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Baseline Studio</ItemTitle>
                      <ItemDescription>Product strategy consultancy</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <Button variant="outline" size="sm">View</Button>
                    </ItemActions>
                  </Item>
                </ShowcaseCard>
                <ShowcaseCard title="Empty">
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon"><FolderOpen size={22} /></EmptyMedia>
                      <EmptyTitle>No projects yet</EmptyTitle>
                      <EmptyDescription>Create your first project to get started.</EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <Button size="sm">New project</Button>
                    </EmptyContent>
                  </Empty>
                </ShowcaseCard>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── stateful demos for the date/picker primitives ── */
function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 5, 20));
  return <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" style={{ borderColor: "var(--bl-border-divider)" }} />;
}

function DatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start gap-2 font-normal">
          <CalendarBlank size={15} />
          {date ? date.toLocaleDateString() : <span className="text-muted-foreground">Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}

const FRAMEWORKS = ["Dashboard", "Wallets", "Trade", "Exchange", "Settings"];
function ComboboxDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between font-normal">
          {value || <span className="text-muted-foreground">Select page...</span>}
          <CaretUpDown size={14} className="opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search page..." />
          <CommandList>
            <CommandEmpty>No page found.</CommandEmpty>
            <CommandGroup>
              {FRAMEWORKS.map((f) => (
                <CommandItem key={f} value={f} onSelect={(v) => { setValue(v === value ? "" : v); setOpen(false); }}>
                  <Check size={14} className={value === f ? "opacity-100" : "opacity-0"} />
                  {f}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function OtpDemo() {
  const [value, setValue] = useState("");
  return (
    <InputOTP maxLength={6} value={value} onChange={setValue}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-xl font-heading font-medium mb-4"
      style={{ color: "var(--bl-fg-primary)" }}
    >
      {children}
    </h2>
  );
}

export default PrimitivesWorkspace;
