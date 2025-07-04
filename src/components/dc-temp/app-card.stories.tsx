import type { Meta, StoryObj } from "@storybook/react"
import { ImageIcon, Brush, Video } from "lucide-react"
import { AppCard } from "./app-card"

const meta: Meta<typeof AppCard> = {
  title: "Components/AppCard",
  component: AppCard,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    showProgress: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof AppCard>

const sampleApp = {
  name: "PixelMaster",
  icon: <ImageIcon className="text-violet-500" />,
  description: "Advanced image editing and composition",
  category: "Creative",
  recent: true,
  new: false,
  progress: 100,
}

const newApp = {
  name: "UXFlow",
  icon: <Brush className="text-fuchsia-500" />,
  description: "Intuitive user experience design",
  category: "Design",
  recent: false,
  new: true,
  progress: 85,
}

const installingApp = {
  name: "VideoStudio",
  icon: <Video className="text-pink-500" />,
  description: "Cinematic video editing and production",
  category: "Video",
  recent: false,
  new: false,
  progress: 45,
}

export const Default: Story = {
  args: {
    app: sampleApp,
    onOpen: (app) => console.log("Open app:", app.name),
    onFavorite: (app) => console.log("Favorite app:", app.name),
  },
}

export const NewApp: Story = {
  args: {
    app: newApp,
    showProgress: true,
    onOpen: (app) => console.log("Open app:", app.name),
    onFavorite: (app) => console.log("Favorite app:", app.name),
  },
}

export const Installing: Story = {
  args: {
    app: installingApp,
    showProgress: true,
    onOpen: (app) => console.log("Open app:", app.name),
    onFavorite: (app) => console.log("Favorite app:", app.name),
  },
}
