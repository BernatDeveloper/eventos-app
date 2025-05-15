import {
    MdSportsSoccer,
    MdMusicNote,
    MdWork,
    MdVideogameAsset,
    MdFlightTakeoff,
    MdSchool,
    MdLocalDining,
    MdTheaterComedy,
    MdEventAvailable,
    MdCategory,
} from "react-icons/md";

export const categories = {
  Sport: {
    name: "Sport",
    icon: MdSportsSoccer,
    color1: "from-red-500",
    color2: "to-orange-300", 
    colorIcon: "text-white",
  },
  Music: {
    name: "Music",
    icon: MdMusicNote,
    color1: "from-purple-500",
    color2: "to-pink-500",
    colorIcon: "text-white",
  },
  Work: {
    name: "Work",
    icon: MdWork,
    color1: "from-gray-700",
    color2: "to-gray-900",
    colorIcon: "text-white",
  },
  Videogames: {
    name: "Videogames",
    icon: MdVideogameAsset,
    color1: "from-indigo-500",
    color2: "to-purple-700",
    colorIcon: "text-white",
  },
  Vacations: {
    name: "Vacations",
    icon: MdFlightTakeoff,
    color1: "from-cyan-400",
    color2: "to-blue-700",
    colorIcon: "text-white",
  },
  Education: {
    name: "Education",
    icon: MdSchool,
    color1: "from-red-400",
    color2: "to-red-600",
    colorIcon: "text-white",
  },
  FoodAndDrink: {
    name: "FoodAndDrink",
    icon: MdLocalDining,
    color1: "from-yellow-400",
    color2: "to-amber-500",
    colorIcon: "text-black",
  },
  Theater: {
    name: "Theater",
    icon: MdTheaterComedy,
    color1: "from-pink-500",
    color2: "to-red-700",
    colorIcon: "text-white",
  },
  Conferences: {
    name: "Conferences",
    icon: MdEventAvailable,
    color1: "from-green-400",
    color2: "to-teal-600",
    colorIcon: "text-white",
  },
  Other: {
    name: "Other",
    icon: MdCategory,
    color1: "from-gray-500",
    color2: "to-gray-600",
    colorIcon: "text-white",
  },
};


export const getEventCategory = (categoryName: string) => {
    return Object.values(categories).find(cat => cat.name === categoryName) || categories.Other;
};