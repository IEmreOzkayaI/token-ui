/**
 * Icon Library - Token UI Design System
 * Lucide React icon mappings and categories
 * Import from lucide-react
 */

export const iconCategories = {
  // Navigation icons
  navigation: {
    menu: "Menu",
    x: "X",
    chevronLeft: "ChevronLeft",
    chevronRight: "ChevronRight",
    chevronUp: "ChevronUp",
    chevronDown: "ChevronDown",
    arrowLeft: "ArrowLeft",
    arrowRight: "ArrowRight",
    arrowUp: "ArrowUp",
    arrowDown: "ArrowDown",
    home: "Home",
    settings: "Settings",
  },

  // Financial/Business icons
  finance: {
    dollarSign: "DollarSign",
    trendingUp: "TrendingUp",
    trendingDown: "TrendingDown",
    creditCard: "CreditCard",
    wallet: "Wallet",
    barChart3: "BarChart3",
    lineChart: "LineChart",
    pieChart: "PieChart",
    receipt: "Receipt",
    invoice: "FileText",
  },

  // Action icons
  actions: {
    download: "Download",
    upload: "Upload",
    share: "Share2",
    copy: "Copy",
    trash: "Trash",
    edit: "Edit",
    delete: "X",
    save: "Save",
    plus: "Plus",
    minus: "Minus",
  },

  // Utility icons
  utility: {
    search: "Search",
    filter: "Filter",
    sort: "ArrowUpDown",
    refresh: "RotateCw",
    moreHorizontal: "MoreHorizontal",
    moreVertical: "MoreVertical",
    eye: "Eye",
    eyeOff: "EyeOff",
    bell: "Bell",
    clock: "Clock",
  },

  // Communication icons
  communication: {
    message: "MessageCircle",
    mail: "Mail",
    send: "Send",
    phone: "Phone",
    phoneOff: "PhoneOff",
    user: "User",
    users: "Users",
    userPlus: "UserPlus",
  },

  // Content icons
  content: {
    file: "File",
    fileText: "FileText",
    folder: "Folder",
    folderOpen: "FolderOpen",
    image: "Image",
    music: "Music",
    video: "Video",
    book: "Book",
    bookmark: "Bookmark",
  },

  // Technology icons
  technology: {
    cloud: "Cloud",
    server: "Server",
    database: "Database",
    cpu: "Cpu",
    monitor: "Monitor",
    smartphone: "Smartphone",
    tablet: "Tablet",
    wifi: "Wifi",
    wifiOff: "WifiOff",
    battery: "Battery",
  },

  // Status icons
  status: {
    checkCircle: "CheckCircle",
    alertCircle: "AlertCircle",
    infoCircle: "InfoCircle",
    xCircle: "XCircle",
    check: "Check",
    x: "X",
    minus: "Minus",
    help: "HelpCircle",
  },

  // Creative/Design icons
  creative: {
    palette: "Palette",
    paintbrush: "Paintbrush",
    pencil: "Pencil",
    zap: "Zap",
    sparkles: "Sparkles",
    star: "Star",
    heart: "Heart",
  },

  // AI/Smart icons
  ai: {
    brain: "Brain",
    lightbulb: "Lightbulb",
    wand2: "Wand2",
    sparkles: "Sparkles",
  },

  // Time/Date icons
  time: {
    calendar: "Calendar",
    clock: "Clock",
    timer: "Timer",
    hourglass: "Hourglass",
  },

  // Location icons
  location: {
    mapPin: "MapPin",
    map: "Map",
    navigation: "Navigation",
    compass: "Compass",
  },
}

// Size presets for icons
export const iconSizes = {
  xs: "size-3",      // 12px
  sm: "size-4",      // 16px
  md: "size-5",      // 20px
  lg: "size-6",      // 24px
  xl: "size-8",      // 32px
  "2xl": "size-10",  // 40px
  "3xl": "size-12",  // 48px
}

// Icon color mappings to semantic tokens
export const iconColors = {
  default: "text-foreground",
  primary: "text-primary",
  secondary: "text-secondary",
  muted: "text-muted-foreground",
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  error: "text-destructive",
  info: "text-primary",
}

// Common icon combinations (icon pairs)
export const iconPairs = {
  eyeToggle: {
    hidden: "Eye",
    visible: "EyeOff",
  },
  expandCollapse: {
    expand: "Maximize2",
    collapse: "Minimize2",
  },
  sortOrder: {
    ascending: "ArrowUp",
    descending: "ArrowDown",
    unsorted: "ArrowUpDown",
  },
  status: {
    success: "CheckCircle",
    error: "XCircle",
    warning: "AlertCircle",
    info: "InfoCircle",
  },
}

// Icon stroke width configurations
export const strokeWidths = {
  light: 1.5,
  normal: 2,
  bold: 2.5,
}
