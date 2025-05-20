import {
  MdSportsSoccer,
  MdMusicNote,
  MdWork,
  MdVideogameAsset,
  MdFlight,
  MdSchool,
  MdLocalDining,
  MdTheaterComedy,
  MdEventAvailable,
  MdExtension,
  MdCategory,
} from "react-icons/md";

export const categories = {
  Sport: {
    name: "Sport",
    icon: MdSportsSoccer,
    color1: "from-orange-300",
    color2: "to-red-500",
    colorIcon: "text-red-500",
  },
  Music: {
    name: "Music",
    icon: MdMusicNote,
    color1: "from-pink-400",
    color2: "to-purple-800",
    colorIcon: "text-purple-800",
  },
  Work: {
    name: "Work",
    icon: MdWork,
    color1: "from-gray-400",
    color2: "to-gray-900",
    colorIcon: "text-gray-900",
  },
  Videogames: {
    name: "Videogames",
    icon: MdVideogameAsset,
    color1: "from-indigo-300",
    color2: "to-purple-700",
    colorIcon: "text-purple-700",
  },
  Vacations: {
    name: "Vacations",
    icon: MdFlight,
    color1: "from-cyan-300",
    color2: "to-blue-700",
    colorIcon: "text-blue-700",
  },
  Education: {
    name: "Education",
    icon: MdSchool,
    color1: "from-red-300",
    color2: "to-red-600",
    colorIcon: "text-red-600",
  },
  FoodAndDrink: {
    name: "FoodAndDrink",
    icon: MdLocalDining,
    color1: "from-yellow-300",
    color2: "to-amber-600",
    colorIcon: "text-amber-600",
  },
  Theater: {
    name: "Theater",
    icon: MdTheaterComedy,
    color1: "from-pink-300",
    color2: "to-red-700",
    colorIcon: "text-red-700",
  },
  Conferences: {
    name: "Conferences",
    icon: MdEventAvailable,
    color1: "from-green-300",
    color2: "to-teal-600",
    colorIcon: "text-teal-600",
  },
  Games: {
    name: "Games",
    icon: MdExtension,
    color1: "from-emerald-200",
    color2: "to-green-600",
    colorIcon: "text-green-600",
  },
  Other: {
    name: "Other",
    icon: MdCategory,
    color1: "from-gray-600",
    color2: "to-gray-600",
    colorIcon: "text-gray-300",
  },
};


export const getEventCategory = (categoryName: string) => {
  return Object.values(categories).find(cat => cat.name === categoryName) || categories.Other;
};