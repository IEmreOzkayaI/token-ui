"use client"

import { useState } from "react"
import {
  FileIcon,
  PenLineIcon,
  EyeIcon,
  UserIcon,
} from "lucide-react"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/primitives/menubar"

const items = [
  { id: "file", icon: FileIcon, label: "File" },
  { id: "edit", icon: PenLineIcon, label: "Edit" },
  { id: "view", icon: EyeIcon, label: "View" },
  { id: "profiles", icon: UserIcon, label: "Profiles" },
] as const

export default function MenubarIconized() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger
          onClick={() => setExpandedId("file")}
          onFocus={() => setExpandedId("file")}
          className="gap-1.5 transition-all duration-200"
        >
          <FileIcon className="size-4 shrink-0" />
          <span
            className={`overflow-hidden transition-all duration-200 ${
              expandedId === "file"
                ? "max-w-24 opacity-100"
                : "max-w-0 opacity-0"
            }`}
          >
            File
          </span>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>New Incognito Window</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarGroup>
                  <MenubarItem>Email link</MenubarItem>
                  <MenubarItem>Messages</MenubarItem>
                  <MenubarItem>Notes</MenubarItem>
                </MenubarGroup>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger
          onClick={() => setExpandedId("edit")}
          onFocus={() => setExpandedId("edit")}
          className="gap-1.5 transition-all duration-200"
        >
          <PenLineIcon className="size-4 shrink-0" />
          <span
            className={`overflow-hidden transition-all duration-200 ${
              expandedId === "edit"
                ? "max-w-24 opacity-100"
                : "max-w-0 opacity-0"
            }`}
          >
            Edit
          </span>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarGroup>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarSub>
              <MenubarSubTrigger>Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarGroup>
                  <MenubarItem>Search the web</MenubarItem>
                </MenubarGroup>
                <MenubarSeparator />
                <MenubarGroup>
                  <MenubarItem>Find...</MenubarItem>
                  <MenubarItem>Find Next</MenubarItem>
                  <MenubarItem>Find Previous</MenubarItem>
                </MenubarGroup>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger
          onClick={() => setExpandedId("view")}
          onFocus={() => setExpandedId("view")}
          className="gap-1.5 transition-all duration-200"
        >
          <EyeIcon className="size-4 shrink-0" />
          <span
            className={`overflow-hidden transition-all duration-200 ${
              expandedId === "view"
                ? "max-w-24 opacity-100"
                : "max-w-0 opacity-0"
            }`}
          >
            View
          </span>
        </MenubarTrigger>
        <MenubarContent className="w-44">
          <MenubarGroup>
            <MenubarCheckboxItem>Bookmarks Bar</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>Full URLs</MenubarCheckboxItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>
              Reload <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled inset>
              Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>Toggle Fullscreen</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>Hide Sidebar</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger
          onClick={() => setExpandedId("profiles")}
          onFocus={() => setExpandedId("profiles")}
          className="gap-1.5 transition-all duration-200"
        >
          <UserIcon className="size-4 shrink-0" />
          <span
            className={`overflow-hidden transition-all duration-200 ${
              expandedId === "profiles"
                ? "max-w-24 opacity-100"
                : "max-w-0 opacity-0"
            }`}
          >
            Profiles
          </span>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>Edit...</MenubarItem>
          </MenubarGroup>
          <MenubarSeparator />
          <MenubarGroup>
            <MenubarItem inset>Add Profile...</MenubarItem>
          </MenubarGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
