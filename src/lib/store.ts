import { Movie, Category, SiteSettings } from "@/types/movie";

const MOVIES_KEY = "topmovies_movies";
const CATEGORIES_KEY = "topmovies_categories";
const SETTINGS_KEY = "topmovies_settings";

const defaultCategories: Category[] = [
  { id: "1", name: "Action", slug: "action", icon: "⚡", backdropUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&q=80" },
  { id: "2", name: "Drama", slug: "drama", icon: "🎭", backdropUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80" },
  { id: "3", name: "Thriller", slug: "thriller", icon: "🔪", backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80" },
  { id: "4", name: "Horror", slug: "horror", icon: "👻", backdropUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&q=80" },
  { id: "5", name: "Sci-Fi", slug: "sci-fi", icon: "🚀", backdropUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80" },
  { id: "6", name: "Comedy", slug: "comedy", icon: "😂", backdropUrl: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&q=80" },
  { id: "7", name: "Animation", slug: "animation", icon: "✨", backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80" },
];

const defaultMovies: Movie[] = [
  {
    id: "1",
    title: "Interstellar",
    slug: "interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. When Earth becomes uninhabitable, Cooper must leave his family behind to lead a crew of astronauts through a newly discovered wormhole.",
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    posterUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&q=80",
    trailerUrl: "",
    year: 2014,
    duration: "2h 49m",
    language: "English",
    rating: 8.6,
    genres: ["Sci-Fi", "Drama"],
    cast: [
      { name: "Matthew McConaughey", role: "Cooper" },
      { name: "Anne Hathaway", role: "Brand" },
      { name: "Jessica Chastain", role: "Murph" },
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80",
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
    ],
    tags: ["space", "time-travel", "family", "christopher-nolan"],
    featured: true,
    hero: true,
    downloadLinks: [
      { quality: "4K", size: "18.5 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "1080p", size: "4.2 GB", format: "MKV", server: "Server 1", url: "#" },
      { quality: "720p", size: "1.8 GB", format: "MP4", server: "Mega", url: "#" },
      { quality: "480p", size: "750 MB", format: "MP4", server: "Server 1", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "The Dark Knight",
    slug: "the-dark-knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    tagline: "Why So Serious?",
    posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1920&q=80",
    year: 2008,
    duration: "2h 32m",
    language: "English",
    rating: 9.0,
    genres: ["Action", "Thriller"],
    cast: [
      { name: "Christian Bale", role: "Bruce Wayne" },
      { name: "Heath Ledger", role: "Joker" },
      { name: "Aaron Eckhart", role: "Harvey Dent" },
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&q=80",
    ],
    tags: ["batman", "dc", "superhero", "christopher-nolan"],
    featured: true,
    hero: true,
    downloadLinks: [
      { quality: "1080p", size: "3.8 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "720p", size: "1.6 GB", format: "MP4", server: "Server 1", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Parasite",
    slug: "parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan. A darkly comic thriller about social inequality.",
    tagline: "Act like you own the place.",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80",
    year: 2019,
    duration: "2h 12m",
    language: "Korean",
    rating: 8.5,
    genres: ["Drama", "Thriller"],
    cast: [
      { name: "Song Kang-ho", role: "Ki-taek" },
      { name: "Lee Sun-kyun", role: "Mr. Park" },
    ],
    screenshots: [],
    tags: ["korean", "bong-joon-ho", "class-war", "oscar-winner"],
    featured: true,
    hero: true,
    downloadLinks: [
      { quality: "1080p", size: "2.9 GB", format: "MKV", server: "Mega", url: "#" },
      { quality: "720p", size: "1.3 GB", format: "MP4", server: "Server 1", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Blade Runner 2049",
    slug: "blade-runner-2049",
    description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    tagline: "The key to the future is finally unearthed.",
    posterUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=1920&q=80",
    year: 2017,
    duration: "2h 44m",
    language: "English",
    rating: 8.0,
    genres: ["Sci-Fi", "Drama"],
    cast: [
      { name: "Ryan Gosling", role: "K" },
      { name: "Harrison Ford", role: "Rick Deckard" },
      { name: "Ana de Armas", role: "Joi" },
    ],
    screenshots: [],
    tags: ["cyberpunk", "dystopia", "sequel", "villeneuve"],
    featured: false,
    hero: false,
    downloadLinks: [
      { quality: "4K", size: "22 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "1080p", size: "5.1 GB", format: "MKV", server: "Server 1", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Midsommar",
    slug: "midsommar",
    description: "A couple travel to Sweden to visit a rural hometown's midsummer festival. What begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition.",
    tagline: "Let the festivities begin.",
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80",
    year: 2019,
    duration: "2h 28m",
    language: "English",
    rating: 7.1,
    genres: ["Horror", "Drama"],
    cast: [
      { name: "Florence Pugh", role: "Dani" },
      { name: "Jack Reynor", role: "Christian" },
    ],
    screenshots: [],
    tags: ["folk-horror", "ari-aster", "cult", "sweden"],
    featured: false,
    hero: false,
    downloadLinks: [
      { quality: "1080p", size: "3.5 GB", format: "MKV", server: "Server 1", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "The Grand Budapest Hotel",
    slug: "the-grand-budapest-hotel",
    description: "The adventures of Gustave H, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.",
    tagline: "A comedy film.",
    posterUrl: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=1920&q=80",
    year: 2014,
    duration: "1h 39m",
    language: "English",
    rating: 8.1,
    genres: ["Comedy", "Drama"],
    cast: [
      { name: "Ralph Fiennes", role: "Gustave H" },
      { name: "Tony Revolori", role: "Zero" },
    ],
    screenshots: [],
    tags: ["wes-anderson", "comedy", "europe", "hotel"],
    featured: false,
    hero: false,
    downloadLinks: [
      { quality: "1080p", size: "2.4 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "720p", size: "1.1 GB", format: "MP4", server: "Server 1", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Spirited Away",
    slug: "spirited-away",
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    tagline: "The tunnel leads to a magical place.",
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&q=80",
    year: 2001,
    duration: "2h 5m",
    language: "Japanese",
    rating: 8.6,
    genres: ["Animation", "Drama"],
    cast: [
      { name: "Daveigh Chase", role: "Chihiro (English dub)" },
      { name: "Suzanne Pleshette", role: "Yubaba (English dub)" },
    ],
    screenshots: [],
    tags: ["studio-ghibli", "miyazaki", "anime", "fantasy"],
    featured: true,
    hero: false,
    downloadLinks: [
      { quality: "1080p", size: "2.8 GB", format: "MKV", server: "Server 1", url: "#" },
      { quality: "720p", size: "1.2 GB", format: "MP4", server: "Mega", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    title: "Dune",
    slug: "dune",
    description: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
    tagline: "Beyond fear, destiny awaits.",
    posterUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80",
    year: 2021,
    duration: "2h 35m",
    language: "English",
    rating: 8.0,
    genres: ["Sci-Fi", "Action"],
    cast: [
      { name: "Timothée Chalamet", role: "Paul Atreides" },
      { name: "Zendaya", role: "Chani" },
      { name: "Oscar Isaac", role: "Duke Leto" },
    ],
    screenshots: [],
    tags: ["dune", "frank-herbert", "villeneuve", "space-opera"],
    featured: true,
    hero: true,
    downloadLinks: [
      { quality: "4K", size: "20 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "1080p", size: "4.5 GB", format: "MKV", server: "Server 1", url: "#" },
      { quality: "720p", size: "2 GB", format: "MP4", server: "Mega", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "9",
    title: "Oppenheimer",
    slug: "oppenheimer",
    description: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II, exploring the moral and political complexities of nuclear weapons creation.",
    tagline: "The world forever changes.",
    posterUrl: "https://images.unsplash.com/photo-1563291074-2bf8677ac0e3?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1563291074-2bf8677ac0e3?w=1920&q=80",
    year: 2023,
    duration: "3h 0m",
    language: "English",
    rating: 8.9,
    genres: ["Drama", "Thriller"],
    cast: [
      { name: "Cillian Murphy", role: "J. Robert Oppenheimer" },
      { name: "Emily Blunt", role: "Katherine Oppenheimer" },
      { name: "Matt Damon", role: "Leslie Groves" },
      { name: "Robert Downey Jr.", role: "Lewis Strauss" },
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    ],
    tags: ["ww2", "nuclear", "biography", "christopher-nolan"],
    featured: true,
    hero: true,
    downloadLinks: [
      { quality: "4K", size: "21 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "1080p", size: "5.8 GB", format: "MKV", server: "Server 1", url: "#" },
      { quality: "720p", size: "2.3 GB", format: "MP4", server: "Mega", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "10",
    title: "Everything Everywhere All at Once",
    slug: "everything-everywhere-all-at-once",
    description: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.",
    tagline: "The universe is so much bigger than you realize.",
    posterUrl: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80",
    year: 2022,
    duration: "2h 19m",
    language: "English",
    rating: 8.1,
    genres: ["Action", "Comedy", "Sci-Fi"],
    cast: [
      { name: "Michelle Yeoh", role: "Evelyn Wang" },
      { name: "Ke Huy Quan", role: "Waymond Wang" },
      { name: "Jamie Lee Curtis", role: "Deirdre Beaubeirdre" },
    ],
    screenshots: [],
    tags: ["multiverse", "a24", "oscar-winner", "action"],
    featured: true,
    hero: false,
    downloadLinks: [
      { quality: "1080p", size: "3.9 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "720p", size: "1.7 GB", format: "MP4", server: "Server 1", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "11",
    title: "The Shawshank Redemption",
    slug: "the-shawshank-redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. A timeless story of hope and friendship behind bars.",
    tagline: "Fear can hold you prisoner. Hope can set you free.",
    posterUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80",
    year: 1994,
    duration: "2h 22m",
    language: "English",
    rating: 9.3,
    genres: ["Drama"],
    cast: [
      { name: "Tim Robbins", role: "Andy Dufresne" },
      { name: "Morgan Freeman", role: "Ellis Boyd 'Red' Redding" },
      { name: "Bob Gunton", role: "Warden Norton" },
    ],
    screenshots: [],
    tags: ["prison", "hope", "friendship", "classic"],
    featured: true,
    hero: false,
    downloadLinks: [
      { quality: "1080p", size: "2.5 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "720p", size: "1.1 GB", format: "MP4", server: "Server 1", url: "#" },
      { quality: "480p", size: "600 MB", format: "MP4", server: "Mega", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "12",
    title: "Inception",
    slug: "inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    tagline: "Your mind is the scene of the crime.",
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=80",
    year: 2010,
    duration: "2h 28m",
    language: "English",
    rating: 8.8,
    genres: ["Action", "Sci-Fi", "Thriller"],
    cast: [
      { name: "Leonardo DiCaprio", role: "Cobb" },
      { name: "Joseph Gordon-Levitt", role: "Arthur" },
      { name: "Elliot Page", role: "Ariadne" },
      { name: "Tom Hardy", role: "Eames" },
    ],
    screenshots: [
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
    ],
    tags: ["dreams", "heist", "christopher-nolan", "mind-bending"],
    featured: true,
    hero: false,
    downloadLinks: [
      { quality: "4K", size: "19 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "1080p", size: "4.8 GB", format: "MKV", server: "Server 1", url: "#" },
      { quality: "720p", size: "2.1 GB", format: "MP4", server: "Mega", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "13",
    title: "Joker",
    slug: "joker",
    description: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime, transforming into the criminal mastermind Joker.",
    tagline: "Put on a happy face.",
    posterUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&q=80",
    year: 2019,
    duration: "2h 2m",
    language: "English",
    rating: 8.4,
    genres: ["Drama", "Thriller"],
    cast: [
      { name: "Joaquin Phoenix", role: "Arthur Fleck / Joker" },
      { name: "Robert De Niro", role: "Murray Franklin" },
      { name: "Zazie Beetz", role: "Sophie Dumond" },
    ],
    screenshots: [],
    tags: ["dc", "villain", "psychological", "crime"],
    featured: false,
    hero: false,
    downloadLinks: [
      { quality: "1080p", size: "4.1 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "720p", size: "1.9 GB", format: "MP4", server: "Server 1", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "14",
    title: "Your Name",
    slug: "your-name",
    description: "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart? A beautiful anime masterpiece about love across time.",
    tagline: "What is your name?",
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1920&q=80",
    year: 2016,
    duration: "1h 52m",
    language: "Japanese",
    rating: 8.4,
    genres: ["Animation", "Drama"],
    cast: [
      { name: "Ryunosuke Kamiki", role: "Taki Tachibana" },
      { name: "Mone Kamishiraishi", role: "Mitsuha Miyamizu" },
    ],
    screenshots: [],
    tags: ["anime", "makoto-shinkai", "romance", "time-travel"],
    featured: false,
    hero: false,
    downloadLinks: [
      { quality: "1080p", size: "2.0 GB", format: "MKV", server: "Server 1", url: "#" },
      { quality: "720p", size: "950 MB", format: "MP4", server: "Mega", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "15",
    title: "Get Out",
    slug: "get-out",
    description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
    tagline: "Just because you're invited, doesn't mean you're welcome.",
    posterUrl: "https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?w=1920&q=80",
    year: 2017,
    duration: "1h 44m",
    language: "English",
    rating: 7.7,
    genres: ["Horror", "Thriller"],
    cast: [
      { name: "Daniel Kaluuya", role: "Chris Washington" },
      { name: "Allison Williams", role: "Rose Armitage" },
      { name: "Bradley Whitford", role: "Dean Armitage" },
    ],
    screenshots: [],
    tags: ["jordan-peele", "social-horror", "racism", "psychological"],
    featured: false,
    hero: false,
    downloadLinks: [
      { quality: "1080p", size: "2.7 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "720p", size: "1.2 GB", format: "MP4", server: "Server 1", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "16",
    title: "The Lion King",
    slug: "the-lion-king",
    description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself. A timeless animated classic about courage, family and destiny.",
    tagline: "Life's greatest adventure is finding your place in the Circle of Life.",
    posterUrl: "https://images.unsplash.com/photo-1612831455359-970e23a1e4e9?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1612831455359-970e23a1e4e9?w=1920&q=80",
    year: 1994,
    duration: "1h 28m",
    language: "English",
    rating: 8.5,
    genres: ["Animation", "Drama"],
    cast: [
      { name: "Matthew Broderick", role: "Simba" },
      { name: "Jeremy Irons", role: "Scar" },
      { name: "James Earl Jones", role: "Mufasa" },
    ],
    screenshots: [],
    tags: ["disney", "classic", "family", "musical"],
    featured: false,
    hero: false,
    downloadLinks: [
      { quality: "1080p", size: "2.2 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "720p", size: "1.0 GB", format: "MP4", server: "Server 1", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "17",
    title: "Avengers: Endgame",
    slug: "avengers-endgame",
    description: "After the devastating events of Avengers: Infinity War, the remaining Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    tagline: "Whatever it takes.",
    posterUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=1920&q=80",
    year: 2019,
    duration: "3h 1m",
    language: "English",
    rating: 8.4,
    genres: ["Action", "Sci-Fi"],
    cast: [
      { name: "Robert Downey Jr.", role: "Tony Stark / Iron Man" },
      { name: "Chris Evans", role: "Steve Rogers / Captain America" },
      { name: "Mark Ruffalo", role: "Bruce Banner / Hulk" },
      { name: "Chris Hemsworth", role: "Thor" },
    ],
    screenshots: [],
    tags: ["marvel", "mcu", "superhero", "avengers"],
    featured: false,
    hero: false,
    downloadLinks: [
      { quality: "4K", size: "24 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "1080p", size: "6.5 GB", format: "MKV", server: "Server 1", url: "#" },
      { quality: "720p", size: "2.8 GB", format: "MP4", server: "Mega", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "18",
    title: "Whiplash",
    slug: "whiplash",
    description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    tagline: "The road to greatness can take you to the edge.",
    posterUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=80",
    year: 2014,
    duration: "1h 47m",
    language: "English",
    rating: 8.5,
    genres: ["Drama"],
    cast: [
      { name: "Miles Teller", role: "Andrew Neiman" },
      { name: "J.K. Simmons", role: "Terence Fletcher" },
    ],
    screenshots: [],
    tags: ["music", "jazz", "ambition", "drumming"],
    featured: false,
    hero: false,
    downloadLinks: [
      { quality: "1080p", size: "2.3 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "720p", size: "1.0 GB", format: "MP4", server: "Server 1", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "19",
    title: "Hereditary",
    slug: "hereditary",
    description: "When the matriarch of the Graham family passes away, her daughter's family begins to unravel cryptic and terrifying secrets about their ancestry, leading to a harrowing supernatural horror.",
    tagline: "Every family tree hides a secret.",
    posterUrl: "https://images.unsplash.com/photo-1605106702734-205df224ecce?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1605106702734-205df224ecce?w=1920&q=80",
    year: 2018,
    duration: "2h 7m",
    language: "English",
    rating: 7.3,
    genres: ["Horror", "Drama"],
    cast: [
      { name: "Toni Collette", role: "Annie Graham" },
      { name: "Alex Wolff", role: "Peter Graham" },
      { name: "Gabriel Byrne", role: "Steve Graham" },
    ],
    screenshots: [],
    tags: ["a24", "ari-aster", "supernatural", "family"],
    featured: false,
    hero: false,
    downloadLinks: [
      { quality: "1080p", size: "3.1 GB", format: "MKV", server: "Server 1", url: "#" },
      { quality: "720p", size: "1.4 GB", format: "MP4", server: "Mega", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "20",
    title: "Mad Max: Fury Road",
    slug: "mad-max-fury-road",
    description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshipper, and a drifter named Max.",
    tagline: "What a lovely day!",
    posterUrl: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1920&q=80",
    year: 2015,
    duration: "2h 0m",
    language: "English",
    rating: 8.1,
    genres: ["Action", "Sci-Fi"],
    cast: [
      { name: "Tom Hardy", role: "Max Rockatansky" },
      { name: "Charlize Theron", role: "Imperator Furiosa" },
      { name: "Nicholas Hoult", role: "Nux" },
    ],
    screenshots: [],
    tags: ["post-apocalyptic", "action", "george-miller", "chase"],
    featured: false,
    hero: false,
    downloadLinks: [
      { quality: "4K", size: "18 GB", format: "MKV", server: "GDrive", url: "#" },
      { quality: "1080p", size: "4.3 GB", format: "MKV", server: "Server 1", url: "#" },
      { quality: "720p", size: "2.0 GB", format: "MP4", server: "Mega", url: "#" },
    ],
    createdAt: new Date().toISOString(),
  },
];

const defaultSettings: SiteSettings = {
  siteTitle: "TopMoviesHub",
  metaDescription: "Your ultimate destination for discovering and downloading the best movies.",
  featuredMovieId: "1",
  heroMovieId: "1",
};

export function resetStore() {
  localStorage.setItem(MOVIES_KEY, JSON.stringify(defaultMovies));
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
}

function initStore() {
  const stored = localStorage.getItem(MOVIES_KEY);
  // If no data OR if stored data has fewer movies than defaults, refresh with defaults
  if (!stored) {
    localStorage.setItem(MOVIES_KEY, JSON.stringify(defaultMovies));
  } else {
    try {
      const parsed = JSON.parse(stored) as Movie[];
      // If stored movies count is less than defaults, seed again but preserve user-added ones
      if (parsed.length < defaultMovies.length) {
        // Merge: keep user-added (id not in defaults), add missing defaults
        const defaultIds = new Set(defaultMovies.map((m) => m.id));
        const userAdded = parsed.filter((m) => !defaultIds.has(m.id));
        localStorage.setItem(MOVIES_KEY, JSON.stringify([...userAdded, ...defaultMovies]));
      }
    } catch {
      localStorage.setItem(MOVIES_KEY, JSON.stringify(defaultMovies));
    }
  }
  if (!localStorage.getItem(CATEGORIES_KEY)) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
  }
  if (!localStorage.getItem(SETTINGS_KEY)) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
  }
}

export function getMovies(): Movie[] {
  initStore();
  try {
    return JSON.parse(localStorage.getItem(MOVIES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveMovies(movies: Movie[]) {
  localStorage.setItem(MOVIES_KEY, JSON.stringify(movies));
}

export function getMovieBySlug(slug: string): Movie | undefined {
  return getMovies().find((m) => m.slug === slug);
}

export function getMovieById(id: string): Movie | undefined {
  return getMovies().find((m) => m.id === id);
}

export function addMovie(movie: Omit<Movie, "id" | "createdAt">): Movie {
  const movies = getMovies();
  const newMovie: Movie = {
    ...movie,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  movies.unshift(newMovie);
  saveMovies(movies);
  return newMovie;
}

export function updateMovie(id: string, updates: Partial<Movie>): Movie | null {
  const movies = getMovies();
  const idx = movies.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  movies[idx] = { ...movies[idx], ...updates };
  saveMovies(movies);
  return movies[idx];
}

export function deleteMovie(id: string) {
  const movies = getMovies().filter((m) => m.id !== id);
  saveMovies(movies);
}

export function getCategories(): Category[] {
  initStore();
  try {
    return JSON.parse(localStorage.getItem(CATEGORIES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveCategories(categories: Category[]) {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

export function getSettings(): SiteSettings {
  initStore();
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: SiteSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function getAdminSession(): boolean {
  return localStorage.getItem("topmovies_admin_session") === "true";
}

export function setAdminSession(value: boolean) {
  if (value) {
    localStorage.setItem("topmovies_admin_session", "true");
  } else {
    localStorage.removeItem("topmovies_admin_session");
  }
}
