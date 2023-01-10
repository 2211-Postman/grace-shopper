'use strict'

const {db, models: {User} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ email: 'warren@gmail.com', password: '123', isAdmin: true }),
    User.create({ email: 'robert@gmail.com', password: '123', isAdmin: true }),
    User.create({ email: 'sam@gmail.com', password: '123', isAdmin: true }),
    User.create({ email: 'jahed@gmail.com', password: '123', isAdmin: true }),
    User.create({ email: 'cody@gmail.com', password: '123', isAdmin: false }),
    User.create({ email: 'murphy@gmail.com', password: '123', isAdmin: false }),
  ])

  // Creating Products
  const products = await Promise.all([
    Product.create({ 
      productName: "AIR JORDAN 1 RETRO HIGH OG CHICAGO",
      brand: "Air Jordan",
      size: 9,
      color: "WHITE/VARSITY RED-BLACK",
      price: 500,
      availability: "IN STOCK",
      description: "The Air Jordan 1 Retro High OG 'Chicago' 2015 colorway features full-leather uppers in Bulls team colors. The 'Chicago' was first retroed in 1994 and stayed true to the 1985 design. Further retros were released in 2013 with small changes to the design, and again in 2015 with the original branding details: the Nike Air logo on the tongue and the original clean heel without the Jumpman logo.",
      stockCount: 5,
      imageURL: "https://img.stadiumgoods.com/14/28/63/00/14286300_42937338_2048.jpg"}),
    Product.create({ 
      productName: "AIR JORDAN 1 RETRO HIGH OG CHICAGO",
      brand: "Air Jordan",
      size: 12,
      color: "WHITE/VARSITY RED-BLACK",
      price: 500,
      availability: "IN STOCK",
      description: "The Air Jordan 1 Retro High OG 'Chicago' 2015 colorway features full-leather uppers in Bulls team colors. The 'Chicago' was first retroed in 1994 and stayed true to the 1985 design. Further retros were released in 2013 with small changes to the design, and again in 2015 with the original branding details: the Nike Air logo on the tongue and the original clean heel without the Jumpman logo.",
      stockCount: 1,
      imageURL: "https://img.stadiumgoods.com/14/28/63/00/14286300_42937338_2048.jpg"}),
    Product.create({ 
      productName: "AIR JORDAN 1 HIGH OG TS SP Travis Scott",
      brand: "Air Jordan",
      size: 9,
      color: "SAIL/DARK MOCHA-UNIVERSITY RED",
      price: 2000,
      availability: "IN STOCK",
      description: "A collaboration between Travis Scott and Jordan brand, the Travis Scott x Air Jordan 1 Retro High OG 'Mocha' features an oversized backward Swoosh on the lateral side. The tumbled white leather and Dark Mocha suede construction is accented by University Red Cactus Jack and Nike branding on the tongue, while the heel sports Scott's face logo in a debossed fashion.",
      stockCount: 3,
      imageURL: "https://img.stadiumgoods.com/14/07/70/10/14077010_43040970_2048.jpg"}),
    Product.create({ 
      productName: "AIR JORDAN 4 RETRO OG WHITE CEMENT",
      brand: "Air Jordan",
      size: 10,
      color: "WHITE/FIRE RED-BLACK-TECH GREY",
      price: 350,
      availability: "IN STOCK",
      description: "The Air Jordan 4 Retro OG ‘White Cement’ returned to store shelves in 2016, featuring a design that’s true to the original 1989 release. The build makes use of a white leather upper, accented with speckled Cement Grey hits on the shoe’s structural wings, midsole and heel panel, the latter adorned with Nike Air branding. A red Jumpman logo on the woven Flight tongue tag offers a contrasting pop of color.",
      stockCount: 2,
      imageURL: "https://img.stadiumgoods.com/12/95/99/12/12959912_42942730_2048.jpg"}),
    Product.create({ 
      productName: "AIR JORDAN 11 RETRO BRED 2019",
      brand: "Air Jordan",
      size: 8.5,
      color: "BLACK/WHITE/VARSITY-RED",
      price: 380,
      availability: "IN STOCK",
      description: "Bringing back an OG colorway, the Air Jordan 11 Retro 'Bred' 2019 features a familiar Chicago Bulls look. The shoe's upper is built with a mix of mesh and patent leather, all finished in black, save for the Varsity Red Jumpman and white '23.' Underfoot, a contrasting white midsole houses Air and a midfoot plate, while a Varsity Red rubber outsole provides traction and completes the look.",
      stockCount: 2,
      imageURL: "https://img.stadiumgoods.com/14/75/81/38/14758138_43099728_2048.jpg"}),
     Product.create({ 
      productName: "KOBE 6 PROTRO GRINCH",
      brand: "Nike",
      size: 9,
      color: "GREEN APPLE/VOLT/CRIMSON/BLACK",
      price: 425,
      availability: "IN STOCK",
      description: "Originally released in 2010 for a Christmas Day collection, the Zoom Kobe 6 Protro 'Grinch' dropped in December 2020. The shoe's upper features a Green Apple and Volt look, with polyurethane detailing creating a snakeskin-style texture throughout the construction. Crimson on the branding and laces adds to the holiday aesthetic, while underfoot, the midsole incorporates Zoom Air to provide cushioning.",
      stockCount: 2,
      imageURL: "https://img.stadiumgoods.com/16/24/68/57/16246857_43122629_2048.jpg"}),
    Product.create({ 
      productName: "KOBE 6 PROTRO GRINCH",
      brand: "Nike",
      size: 10,
      color: "GREEN APPLE/VOLT/CRIMSON/BLACK",
      price: 425,
      availability: "IN STOCK",
      description: "Originally released in 2010 for a Christmas Day collection, the Zoom Kobe 6 Protro 'Grinch' dropped in December 2020. The shoe's upper features a Green Apple and Volt look, with polyurethane detailing creating a snakeskin-style texture throughout the construction. Crimson on the branding and laces adds to the holiday aesthetic, while underfoot, the midsole incorporates Zoom Air to provide cushioning.",
      stockCount: 7,
      imageURL: "https://img.stadiumgoods.com/16/24/68/57/16246857_43122629_2048.jpg"}),
    Product.create({ 
      productName: "KOBE 5 PROTRO BRUCE LEE",
      brand: "Nike",
      size: 9,
      color: "DEL SOL/METALLIC SILVER-COMET",
      price: 390,
      availability: "IN STOCK",
      description: "Released in November 2020, the Zoom Kobe 5 Protro 'Bruce Lee' brings back a 2010 colorway. Inspired by Bruce Lee, whose style and mindset in turn inspired Kobe Bryant, the shoe's upper draws from Lee's jumpsuit in Enter the Dragon. The black and Del Sol look is highlighted by Comet Red scratch marks the forefoot, while Flywire cables support the fit. Underfoot, the two-tone midsole houses Zoom Air in the forefoot for cushioning.",
      stockCount: 3,
      imageURL: "https://img.stadiumgoods.com/16/16/89/84/16168984_43120224_2048.jpg"}),
    Product.create({ 
      productName: "KOBE 8 SYSTEM PYTHON",
      brand: "Nike",
      size: 9,
      color: "SQDRN GREEN/CHLLNG RD-LGN BRWN",
      price: 525,
      availability: "IN STOCK",
      description: "While Kobe Bryant will always be associated with the Black Mamba, the Kobe 8 System ‘Python’ carries an engineered mesh upper that recalls a different species of deadly snake. The kicks dropped in February 2013 to ring in the year of the snake, featuring a mix of olive and dark brown tones that are accented by a bright red Swoosh, matching the branding elements on the tongue and heel counter.",
      stockCount: 2,
      imageURL: "https://img.stadiumgoods.com/16/72/03/76/16720376_42940072_2048.jpg"}),
     Product.create({ 
      productName: "LEBRON 8 RETRO SOUTH BEACH 2021",
      brand: "Nike",
      size: 8.5,
      color: "RETRO/PINK FLASH/FILAMENT GREEN/BLACK",
      price: 275,
      availability: "IN STOCK",
      description: "Bringing back the 2010 colorway, releasing in time for LeBron James' move to the Miami Heat, the LeBron 8 Retro 'South Beach' 2021 dropped in 2021. Built with a mix of genuine leather and Flywire-infused TPU panels, the shoe's upper appears in Filament Green, contrasted by black on the eyestay, molded tongue and Swoosh. Pink Flash highlights the laces, tongue and upper eyelets, while underfoot, more green appears in the 360-degree Max Air unit that provides cushioning in the phylon midsole.",
      stockCount: 8,
      imageURL: "https://img.stadiumgoods.com/17/04/98/10/17049810_43019328_2048.jpg"}),
    Product.create({ 
      productName: "AIR YEEZY 2 NRG SOLAR RED",
      brand: "Nike",
      size: 11.5,
      color: "BLACK/BLACK-SOLAR RED",
      price: 10000,
      availability: "IN STOCK",
      description: "Accented with special details crafted specifically for Kanye, the Air Yeezy 2 NRG ‘Solar Red’ shares a familiar color palette with its Air Yeezy ‘Blink’ predecessor, though the newer model stands out with a more refined silhouette. One feature carried over from the original Air Yeezy is the glow-in-the-dark outsole, which is lifted from the Air Challenge II. The sneaker also includes a molded rubber heel, anaconda textured side panel, and Egyptology references on the tongue and midfoot strap.",
      stockCount: 1,
      imageURL: "https://img.stadiumgoods.com/12/96/03/50/12960350_42960069_2048.jpg"}),
    Product.create({ 
      productName: "YEEZY BOOST 350 V2 ZEBRA",
      brand: "Adidas",
      size: 9.5,
      color: "WHITE/CBLACK/RED",
      price: 615,
      availability: "IN STOCK",
      description: "The Yeezy Boost 350 V2 'Zebra' released on February 25, 2017, combining an upper white / core black Primeknit with a red SPLY 350 branding and a full-length translucent midsole boost. On November 16, 2018 and April 9th, 2022, restocks of the ' Zebra ' arrived, with more pairs hitting the marketplace and building on Kanye's commitment to make Yeezy more available to anyone who wished to acquire them.",
      stockCount: 3,
      imageURL: "https://img.stadiumgoods.com/12/43/12/89/12431289_27476285_2048.jpg"}),
    Product.create({ 
      productName: "YEEZY BOOST 350 V2 ZEBRA",
      brand: "Adidas",
      size: 7,
      color: "WHITE/CBLACK/RED",
      price: 615,
      availability: "IN STOCK",
      description: "The Yeezy Boost 350 V2 'Zebra' released on February 25, 2017, combining an upper white / core black Primeknit with a red SPLY 350 branding and a full-length translucent midsole boost. On November 16, 2018 and April 9th, 2022, restocks of the ' Zebra ' arrived, with more pairs hitting the marketplace and building on Kanye's commitment to make Yeezy more available to anyone who wished to acquire them.",
      stockCount: 2,
      imageURL: "https://img.stadiumgoods.com/12/43/12/89/12431289_27476285_2048.jpg"}),
    Product.create({ 
      productName: "NMD_R1 PK",
      brand: "Adidas",
      size: 7,
      color: "FOOTWEARWHITE/FOOTWEARWHITE/FO",
      price: 200,
      availability: "IN STOCK",
      description: "Twinned with an accompanying all-black colorway, the NMD R1 ‘Japan Triple White’ hit store shelves in 2017. adidas’ popular lifestyle runner dons a pristine white Primeknit upper with matching white details that include a molded heel tab and welded no-sew three-stripes. The lightweight construction up top is supported by a white Boost midsole, featuring Japanese branding on the smaller EVA plug.",
      stockCount: 12,
      imageURL: "https://img.stadiumgoods.com/12/42/77/02/12427702_42962548_2048.jpg"}),
  ])

  console.log(`seeded ${users.length} users and ${products.length} products`);
  console.log(`seeded successfully`);
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1]
  //   }
  // }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
