<script>
	import '../app.css';
    import {Package2, Package, Bell, Home, ShoppingCart, Users, LineChart, CircleUser, Menu, Search} from 'lucide-svelte';
    import {Button} from '$lib/components/ui/button';
    import {Input} from '$lib/components/ui/input';
    import * as Card from "$lib/components/ui/card";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import * as Sheet from '$lib/components/ui/sheet';
    import {Badge} from '$lib/components/ui/badge';
    import { ModeWatcher } from "mode-watcher";

    

    // let children = 

</script>


<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <div class="bg-muted/40 hidden border-r md:block sticky top-0 h-screen">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" class="flex items-center gap-2 font-semibold">
            <Package2 class="h-6 w-6" />
            <span class="">KITS ADMIN</span>
          </a>
          <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
            <Bell class="h-4 w-4" />
            <span class="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div class="flex-1">
          <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
            <a
              href="##"
              class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
            >
              <Home class="h-4 w-4" />
              Dashboard
            </a>
            <a
              href="##"
              class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
            >
              <ShoppingCart class="h-4 w-4" />
              Courses
              <Badge
                class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
              >
                6
              </Badge>
            </a>
            <a
              href="##"
              class="bg-muted text-primary hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
            >
              <Package class="h-4 w-4" />
              Users
            </a>
            <a
              href="##"
              class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
            >
              <Users class="h-4 w-4" />
              Customers
            </a>
            <a
              href="##"
              class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
            >
              <LineChart class="h-4 w-4" />
              Analytics
            </a>
          </nav>
        </div>
        <div class="mt-auto p-4">
          <Card.Root>
            <Card.Header class="p-2 pt-0 md:p-4">
              <Card.Title>Upgrade to Pro</Card.Title>
              <Card.Description>
                Unlock all features and get unlimited access to our support team.
              </Card.Description>
            </Card.Header>
            <Card.Content class="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" class="w-full">Upgrade</Button>
            </Card.Content>
          </Card.Root>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <header class="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 sticky top-0">
        <Sheet.Root>
          <Sheet.Trigger asChild let:builder>
            <Button
              variant="outline"
              size="icon"
              class="shrink-0 md:hidden"
              builders={[builder]}
            >
              <Menu class="h-5 w-5" />
              <span class="sr-only">Toggle navigation menu</span>
            </Button>
          </Sheet.Trigger>
          <Sheet.Content side="left" class="flex flex-col">
            <nav class="grid gap-2 text-lg font-medium">
              <a href="##" class="flex items-center gap-2 text-lg font-semibold">
                <Package2 class="h-6 w-6" />
                <span class="sr-only">Acme Inc</span>
              </a>
              <a
                href="##"
                class="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
              >
                <Home class="h-5 w-5" />
                Dashboard
              </a>
              <a
                href="##"
                class="bg-muted text-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
              >
                <ShoppingCart class="h-5 w-5" />
                Orders
                <Badge
                  class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                >
                  6
                </Badge>
              </a>
              <a
                href="##"
                class="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
              >
                <Package class="h-5 w-5" />
                Products
              </a>
              <a
                href="##"
                class="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
              >
                <Users class="h-5 w-5" />
                Customers
              </a>
              <a
                href="##"
                class="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
              >
                <LineChart class="h-5 w-5" />
                Analytics
              </a>
            </nav>
            <div class="mt-auto">
              <Card.Root>
                <Card.Header>
                  <Card.Title>Upgrade to Pro</Card.Title>
                  <Card.Description>
                    Unlock all features and get unlimited access to our support
                    team.
                  </Card.Description>
                </Card.Header>
                <Card.Content>
                  <Button size="sm" class="w-full">Upgrade</Button>
                </Card.Content>
              </Card.Root>
            </div>
          </Sheet.Content>
        </Sheet.Root>
        <div class="w-full flex-1">
          <form>
            <div class="relative">
              <Search class="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                class="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
          </form>
        </div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild let:builder>
            <Button
              builders={[builder]}
              variant="secondary"
              size="icon"
              class="rounded-full"
            >
              <CircleUser class="h-5 w-5" />
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Label>My Account</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Settings</DropdownMenu.Item>
            <DropdownMenu.Item>Support</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Logout</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </header>
      <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <slot/>
      </main>
      <ModeWatcher/>
    </div>
  </div>
  
