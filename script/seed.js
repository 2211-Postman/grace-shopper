"use strict";

const {
  db,
  models: { User, Product, Order, OrderDetails },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      email: "warren@gmail.com",
      password: "123",
      firstName: "Warren",
      lastName: "Chan",
      isAdmin: true,
    }),
    User.create({
      email: "robert@gmail.com",
      password: "123",
      firstName: "Robert",
      lastName: "West",
      isAdmin: true,
    }),
    User.create({
      email: "sam@gmail.com",
      password: "123",
      firstName: "Sam",
      lastName: "Ting",
      isAdmin: true,
    }),
    User.create({
      email: "jahed@gmail.com",
      password: "123",
      firstName: "Jahed",
      lastName: "Prince",
      isAdmin: true,
    }),
    User.create({
      email: "cody@gmail.com",
      password: "123",
      firstName: "Cody",
      lastName: "Bryant",
      isAdmin: false,
    }),
    User.create({
      email: "murphy@gmail.com",
      password: "123",
      firstName: "Murphy",
      lastName: "James",
      isAdmin: false,
    }),
  ]);

  // Creating Products
  const products = await Promise.all([
    Product.create({
      productName: "AIR JORDAN 1 RETRO HIGH OG CHICAGO",
      sku: "DZ5485612",
      brand: "Air Jordan",
      size: 9,
      color: "WHITE/VARSITY RED-BLACK",
      price: 500,
      description:
        "The Air Jordan 1 Retro High OG 'Chicago' 2015 colorway features full-leather uppers in Bulls team colors. The 'Chicago' was first retroed in 1994 and stayed true to the 1985 design. Further retros were released in 2013 with small changes to the design, and again in 2015 with the original branding details: the Nike Air logo on the tongue and the original clean heel without the Jumpman logo.",
      stockCount: 5,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/080/963/062/original/1029146_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/080/963/055/original/1029146_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/080/963/061/original/1029146_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/080/963/054/original/1029146_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/080/963/050/original/1029146_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    // Product.create({
    //   productName: "AIR JORDAN 1 RETRO HIGH OG CHICAGO",
    //   sku: "DZ5485612",
    //   brand: "Air Jordan",
    //   size: 12,
    //   color: "WHITE/VARSITY RED-BLACK",
    //   price: 500,
    //   description:
    //     "The Air Jordan 1 Retro High OG 'Chicago' 2015 colorway features full-leather uppers in Bulls team colors. The 'Chicago' was first retroed in 1994 and stayed true to the 1985 design. Further retros were released in 2013 with small changes to the design, and again in 2015 with the original branding details: the Nike Air logo on the tongue and the original clean heel without the Jumpman logo.",
    //   stockCount: 1,
    //   imageURL: [
    //     "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/080/963/062/original/1029146_01.jpg.jpeg?action=crop&width=2000",
    //     "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/080/963/055/original/1029146_04.jpg.jpeg?action=crop&width=2000",
    //     "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/080/963/061/original/1029146_03.jpg.jpeg?action=crop&width=2000",
    //     "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/080/963/054/original/1029146_06.jpg.jpeg?action=crop&width=2000",
    //     "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/080/963/050/original/1029146_08.jpg.jpeg?action=crop&width=2000",
    //   ],
    // }),
    Product.create({
      productName: "AIR JORDAN 1 HIGH OG TS SP Travis Scott",
      sku: "CD4487100",
      brand: "Air Jordan",
      size: 9,
      color: "SAIL/DARK MOCHA-UNIVERSITY RED",
      price: 2000,
      description:
        "A collaboration between Travis Scott and Jordan brand, the Travis Scott x Air Jordan 1 Retro High OG 'Mocha' features an oversized backward Swoosh on the lateral side. The tumbled white leather and Dark Mocha suede construction is accented by University Red Cactus Jack and Nike branding on the tongue, while the heel sports Scott's face logo in a debossed fashion.",
      stockCount: 3,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/299/630/original/488879_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/299/635/original/488879_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/299/636/original/488879_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/929/327/original/488879_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/299/639/original/488879_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "AIR JORDAN 3 RETRO OG BLACK CEMENT 2018",
      sku: "D854262001",
      brand: "Air Jordan",
      size: 7.5,
      color: "BLACK/FIRE RED-CEMENT GREY",
      price: 515,
      description:
        "No matter how many times the Black/Cement Air Jordan 3 releases, it’s always going to be a major event. It’s latest return for 2018 was bigger than ever, because the OG “Nike Air” branding is finally back on the heel, missing for the last two retro releases in 2008 and 2011. Even if it was still a Jumpman on the heels, the long absence of the Jordan 3 Black/Cement has left many Jordan collectors fiending for a fresh pair, so demand was higher than ever when these dropped on MJ’s birthday. If you missed out on the 2018 Air Jordan 3 Black/Cement at retail, your friends here at Stadium Goods have you covered. Don’t pass up one of the most iconic sneakers of all time.",
      stockCount: 53,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/011/395/original/144205_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/011/391/original/144205_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/011/392/original/144205_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/011/388/original/144205_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/011/389/original/144205_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "AIR JORDAN 3 RETRO SP WMNS A Ma Maniére",
      sku: "DH3434110",
      brand: "Air Jordan",
      size: 10,
      color: "WHITE/TAUPE-NATURAL",
      price: 340,
      description:
        "The A Ma Maniére x women's Air Jordan 3 Retro SP 'Raised By Women' brings a premium build to its classic basketball construction. Made in collaboration with the Atlanta retailer, the shoe emerges with a tumbled leather construction on the upper, finished in white and complemented by grey suede on the collar, eyestay, heel and toe. The tongues includes mismatched co-branding, with a quilted inner collar and tongue lining supporting the fit. Underfoot, visible Air in the heel of the midsole provides cushioning, giving way to a rubber outsole for traction.",
      stockCount: 2,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/056/093/849/original/690789_01.jpg.jpeg?action=crop&width=950",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/056/093/852/original/690789_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/056/093/855/original/690789_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/056/093/857/original/690789_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/056/093/859/original/690789_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "AIR JORDAN 4 RETRO OG BRED",
      sku: "308497060",
      brand: "Air Jordan",
      size: 8.5,
      color: "BLACK/CEMENT GREY-SUMMIT WHITE",
      price: 425,
      description:
        "This Air Jordan 4 “Bred” is the 2019 retro of the iconic colorway of Michael Jordan’s fourth signature shoe. The famous black and red version of the Jordan 4 returned in the spring of 2019 with its original “Nike Air” branding on the heel for the first time since its first retro release in 1999. Now 20 years after that first retro and 30 years after its initial 1989 release, the “Bred” Air Jordan 4 looks just as outstanding as ever. This true-to-OG retro features a black Durabuck (synthetic nubuck) upper with grey, red, and white accents throughout. In addition to the large Nike Air logo on the heel tab, the original Nike branding is also present on the outsole and sockliner. The Air Jordan 4 “Bred” released on May 4, 2019.",
      stockCount: 25,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/306/465/original/461782_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/306/467/original/461782_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/306/468/original/461782_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/306/466/original/461782_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/306/462/original/461782_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "AIR JORDAN 4 RETRO OG WHITE CEMENT",
      sku: "840606192",
      brand: "Air Jordan",
      size: 10,
      color: "WHITE/FIRE RED-BLACK-TECH GREY",
      price: 350,
      description:
        "The Air Jordan 4 Retro OG ‘White Cement’ returned to store shelves in 2016, featuring a design that’s true to the original 1989 release. The build makes use of a white leather upper, accented with speckled Cement Grey hits on the shoe’s structural wings, midsole and heel panel, the latter adorned with Nike Air branding. A red Jumpman logo on the woven Flight tongue tag offers a contrasting pop of color.",
      stockCount: 2,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/308/064/original/31342_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/308/066/original/31342_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/308/068/original/31342_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/308/073/original/31342_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/308/075/original/31342_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "AIR JORDAN 4 RETRO SP WMNS OFF-WHITE SAIL",
      sku: "CV9388100",
      brand: "Air Jordan",
      size: 11.5,
      color: "SAIL/MUSLIN-WHITE-BLACK",
      price: 425,
      description:
        "The women's Off-White x Air Jordan 4 “Sail” is a highly desirable collaboration between Virgil Abloh’s fashion label and Jordan Brand on Michael Jordan’s fourth signature shoe. Originating as a sample during Abloh’s “Figures of Speech” exhibit in Chicago’s Museum of Contemporary Art in Fall 2019, this clean colorway received an official retail release in Summer 2020 to much fanfare. The signature “quotations” aesthetic of Abloh’s Jordan Brand collaborations underpins this Sail colored shoe, including “Air” branding printed on the midsole and “shoelace” detailing in black lettering on the laces. Translucent detailing, including the heel cup, Wings clips on the collar, and netting on the midsole and throat are all firsts for the Jordan 4. The visible Air window in the heel is surrounded by a white midsole. Release date: July 25, 2020.",
      stockCount: 2,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/083/344/824/original/603678_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/083/344/822/original/603678_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/083/344/821/original/603678_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/083/344/814/original/603678_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/083/344/816/original/603678_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "AIR JORDAN 11 RETRO BRED 2019",
      sku: "378037061",
      brand: "Air Jordan",
      size: 8.5,
      color: "BLACK/WHITE/VARSITY-RED",
      price: 380,
      description:
        "Bringing back an OG colorway, the Air Jordan 11 Retro 'Bred' 2019 features a familiar Chicago Bulls look. The shoe's upper is built with a mix of mesh and patent leather, all finished in black, save for the Varsity Red Jumpman and white '23.' Underfoot, a contrasting white midsole houses Air and a midfoot plate, while a Varsity Red rubber outsole provides traction and completes the look.",
      stockCount: 2,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/047/069/784/original/478948_01.jpg.jpeg?action=crop&width=800",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/046/084/992/original/478948_03.jpg.jpeg?action=crop&width=800",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/046/084/991/original/478948_02.jpg.jpeg?action=crop&width=800",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/046/084/999/original/478948_04.jpg.jpeg?action=crop&width=800",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/046/084/998/original/478948_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/046/085/002/original/478948_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "KD 4 ALL STAR - GALAXY",
      sku: "520814001",
      brand: "Nike",
      size: 9,
      color: "METALLIC SILVER/TOTAL ORANGE-DARK GREY",
      price: 675,
      description:
        "This Nike Zoom KD 4 All Star 'Galaxy' colorway features a metallic silver synthetic upper with total orange accents inspired by flight suits worn by astronauts. Additional features include a NASA-inspired mission patch on the tongue, embroidered dark grey KD branding on the heel, a black starry speckled midsole, and a glow-in-the-dark outsole. The sneaker dropped for the 2012 All-Star Game in Orlando alongside ‘Galaxy’ themed Zoom Kobe 7s, LeBron 9s, and Air Foamposite 1s.",
      stockCount: 4,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/049/367/353/original/13333_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/049/367/356/original/13333_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/049/367/358/original/13333_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/049/367/361/original/13333_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/049/367/365/original/13333_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "KOBE 6 PROTRO GRINCH",
      sku: "CW2190300",
      brand: "Nike",
      size: 9,
      color: "GREEN APPLE/VOLT/CRIMSON/BLACK",
      price: 425,
      description:
        "Originally released in 2010 for a Christmas Day collection, the Zoom Kobe 6 Protro 'Grinch' dropped in December 2020. The shoe's upper features a Green Apple and Volt look, with polyurethane detailing creating a snakeskin-style texture throughout the construction. Crimson on the branding and laces adds to the holiday aesthetic, while underfoot, the midsole incorporates Zoom Air to provide cushioning.",
      stockCount: 2,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/050/505/603/original/631511_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/050/505/608/original/631511_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/050/505/619/original/631511_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/050/505/610/original/631511_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/050/505/624/original/631511_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    // Product.create({
    //   productName: "KOBE 6 PROTRO GRINCH",
    //   sku: "CW2190300",
    //   brand: "Nike",
    //   size: 10,
    //   color: "GREEN APPLE/VOLT/CRIMSON/BLACK",
    //   price: 425,
    //   description:
    //     "Originally released in 2010 for a Christmas Day collection, the Zoom Kobe 6 Protro 'Grinch' dropped in December 2020. The shoe's upper features a Green Apple and Volt look, with polyurethane detailing creating a snakeskin-style texture throughout the construction. Crimson on the branding and laces adds to the holiday aesthetic, while underfoot, the midsole incorporates Zoom Air to provide cushioning.",
    //   stockCount: 7,
    //   imageURL: [
    //     "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/050/505/603/original/631511_01.jpg.jpeg?action=crop&width=2000",
    //     "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/050/505/608/original/631511_03.jpg.jpeg?action=crop&width=2000",
    //     "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/050/505/619/original/631511_06.jpg.jpeg?action=crop&width=2000",
    //     "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/050/505/610/original/631511_04.jpg.jpeg?action=crop&width=2000",
    //     "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/050/505/624/original/631511_08.jpg.jpeg?action=crop&width=2000",
    //   ],
    // }),
    Product.create({
      productName: "KOBE 5 PROTRO BRUCE LEE",
      sku: "CD4991700",
      brand: "Nike",
      size: 9,
      color: "DEL SOL/METALLIC SILVER-COMET",
      price: 390,
      description:
        "Released in November 2020, the Zoom Kobe 5 Protro 'Bruce Lee' brings back a 2010 colorway. Inspired by Bruce Lee, whose style and mindset in turn inspired Kobe Bryant, the shoe's upper draws from Lee's jumpsuit in Enter the Dragon. The black and Del Sol look is highlighted by Comet Red scratch marks the forefoot, while Flywire cables support the fit. Underfoot, the two-tone midsole houses Zoom Air in the forefoot for cushioning.",
      stockCount: 3,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/046/355/079/original/628376_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/046/011/115/original/628376_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/046/011/114/original/628376_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/046/011/118/original/628376_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/046/355/080/original/628376_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "KOBE 8 SYSTEM PYTHON",
      sku: "555035300",
      brand: "Nike",
      size: 9,
      color: "SQDRN GREEN/CHLLNG RD-LGN BRWN",
      price: 525,
      description:
        "While Kobe Bryant will always be associated with the Black Mamba, the Kobe 8 System ‘Python’ carries an engineered mesh upper that recalls a different species of deadly snake. The kicks dropped in February 2013 to ring in the year of the snake, featuring a mix of olive and dark brown tones that are accented by a bright red Swoosh, matching the branding elements on the tongue and heel counter.",
      stockCount: 2,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/052/619/249/original/13306_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/052/619/242/original/13306_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/052/619/243/original/13306_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/052/619/238/original/13306_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/052/619/240/original/13306_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "KOBE 8 SYSTEM CHRISTMAS",
      sku: "555035030",
      brand: "Nike",
      size: 9.5,
      color: "BLK/BRGHT CRMSN-FBRGLSS VVD SL",
      price: 899,
      description:
        "Releasing in late December 2012, the Kobe 8 System 'Christmas' features a vibrant mix of colors on its Engineered Mesh upper. Although seasonally appropriate, the look is actually modeled after the rhinoceros viper. Accented by Bright Crimson on the Swoosh and laces, the speckled Lunarlon midsole gives way to a bright green outsole.",
      stockCount: 6,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/050/216/824/original/13309_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/050/216/815/original/13309_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/050/216/816/original/13309_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/050/216/814/original/13309_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/050/216/819/original/13309_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "KOBE 9 ELITE LOW BEETHOVEN",
      sku: "639045101",
      brand: "Nike",
      size: 11,
      color: "WHITE/BLACK-WOLF GREY",
      price: 549,
      description:
        "The Nike Kobe 9 Elite 'Beethoven' pays tribute to one of Kobe Bryant's many muses. Like the German composers music, the low-top features a timeless quality, thanks to a predominantly grey color scheme on the breathable Flyknit upper. Details include a carbon fiber heel counter for added stability and a Lunarlon midsole for responsive and lightweight cushioning.",
      stockCount: 1,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/078/710/851/original/13010_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/078/710/853/original/13010_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/078/710/854/original/13010_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/078/710/856/original/13010_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/078/710/861/original/13010_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "LEBRON 8 RETRO SOUTH BEACH 2021",
      sku: "CZ0328400",
      brand: "Nike",
      size: 8.5,
      color: "RETRO/PINK FLASH/FILAMENT GREEN/BLACK",
      price: 275,
      description:
        "Bringing back the 2010 colorway, releasing in time for LeBron James' move to the Miami Heat, the LeBron 8 Retro 'South Beach' 2021 dropped in 2021. Built with a mix of genuine leather and Flywire-infused TPU panels, the shoe's upper appears in Filament Green, contrasted by black on the eyestay, molded tongue and Swoosh. Pink Flash highlights the laces, tongue and upper eyelets, while underfoot, more green appears in the 360-degree Max Air unit that provides cushioning in the phylon midsole.",
      stockCount: 8,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/054/966/985/original/694880_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/054/966/980/original/694880_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/054/966/979/original/694880_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/054/966/978/original/694880_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/054/966/972/original/694880_08.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/054/966/974/original/694880_11.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/054/966/976/original/694880_12.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "LEBRON 9 BIG BANG 2022",
      sku: "DH8006800",
      brand: "Nike",
      size: 12,
      color: "TOTAL ORANGE/METALLIC SILVER-T",
      price: 225,
      description:
        "LeBron James debuted this colorwary during the 2012 All-Star Game, featuring a space theme. Returning true to form, the LeBron 9 ‘Big Bang’ arrives in a bright orange hue, with the interior lining and insole display cosmic imagery, while the outsole glows in the dark. The upper features Hyperfuse technology while a large volume Max Air bag in the heel offers lightweight cushioning.",
      stockCount: 3,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/067/957/686/original/897203_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/067/957/681/original/897203_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/067/957/678/original/897203_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/067/957/679/original/897203_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/067/957/680/original/897203_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "LEBRON 10 EXT QS CORK",
      sku: "D580890200",
      brand: "Nike",
      size: 10.5,
      color: "CLSSC BRWN/CLSSC BRWN-UNVRSTY",
      price: 900,
      description:
        "Commemorating LeBron James’ first NBA championship, the LeBron X EXT appears with a QS offering that’s constructed with an authentic cork makeup throughout the upper. The shoe is designed with more premium materials than the performance version, featuring a leather application on the tongue and gold accents on the upper eyelets. Flywire cables along the eyestay generate forefoot support, while the full-length Nike Zoom cushioning unit promotes a cushioned ride.",
      stockCount: 4,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/043/615/975/original/13307_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/043/615/970/original/13307_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/043/615/969/original/13307_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/043/615/968/original/13307_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/043/615/971/original/13307_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "AIR YEEZY NET",
      sku: "366164111",
      brand: "Nike",
      size: 8.5,
      color: "NET/NET",
      price: 130150,
      description:
        "Rounding out the Nike Air Yeezy trio, the “Net” iteration of the sneaker was the last to release on June 1, 2009. Like the previous two colorways, the subtle changes to the upper define these kicks. Anchored by a buttery tan leather upper, this version does away with the all-over Y print on the strap and heel. Instead, the former sports a patent leather look in beige, while the latter portion appears in a supple leather. The aforementioned Y print makes an appearance on the mudguard – almost mimicking elephant print in the process. Perforations also return on the leather portion of the upper. Pink accents on the inner lining and heel, a white midsole, and glow-in-the-dark outsole complete the design",
      stockCount: 1,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/077/930/188/original/12150_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/077/930/181/original/12150_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/077/930/180/original/12150_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/077/930/177/original/12150_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/078/080/273/original/12150_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "AIR YEEZY 2 NRG SOLAR RED",
      sku: "508214006",
      brand: "Nike",
      size: 11.5,
      color: "BLACK/BLACK-SOLAR RED",
      price: 10000,
      description:
        "Accented with special details crafted specifically for Kanye, the Air Yeezy 2 NRG ‘Solar Red’ shares a familiar color palette with its Air Yeezy ‘Blink’ predecessor, though the newer model stands out with a more refined silhouette. One feature carried over from the original Air Yeezy is the glow-in-the-dark outsole, which is lifted from the Air Challenge II. The sneaker also includes a molded rubber heel, anaconda textured side panel, and Egyptology references on the tongue and midfoot strap.",
      stockCount: 1,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/077/963/578/original/12149_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/077/963/579/original/12149_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/077/963/580/original/12149_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/077/963/583/original/12149_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/077/930/193/original/12149_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "YEEZY BOOST 350 TURTLE DOVE",
      sku: "AQ4832",
      brand: "Adidas",
      size: 6.5,
      color: "TURTLE/BLUGRA/CWHITE",
      price: 585,
      description:
        "The adidas Yeezy Boost 350 “Turtledove” is the debut colorway of the modern classic, game-changing silhouette by Kanye West. The inaugural colorway features a Primeknit upper in black and cream white tones with a white rubber midsole that wraps around full-length Boost foam cushioning. The heel tab includes a red stripe to complete the clean look. Released in 2015 in very limited quantities, the 350 Boost “Turtledove” has become one of the rarest and most valuable models of the world famous and highly coveted sneaker line",
      stockCount: 3,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/075/800/577/original/923736_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/075/800/578/original/923736_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/075/800/576/original/923736_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/075/800/575/original/923736_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/075/800/574/original/923736_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "YEEZY BOOST 350 V2 OREO",
      sku: "BY1604",
      brand: "Adidas",
      size: 8,
      color: "CBLACK/CWHITE/CBLACK",
      price: 300,
      description:
        "The adidas Yeezy Boost 350 V2 “Oreo” was the final release of the highly popular silhouette by Kanye West in 2016. Similar to the trio of colorways that hit retailers in November of 2016, this Yeezy Boost 350 V2 features a black woven Primeknit upper and a matching rubber midsole that covers full-length Boost cushioning. This “Oreo” edition features a white stripe across the upper from heel to toe, which earned it the comparison to the delicious sandwich cookies. The Yeezy Boost 350 V2 “Oreo” released in limited quantities in December 2016.",
      stockCount: 9,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/068/990/206/original/67145_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/068/990/212/original/67145_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/068/990/205/original/67145_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/068/990/199/original/67145_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/068/990/202/original/67145_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "YEEZY BOOST 350 V2 REFLECTIVE BELUGA",
      sku: "GW1229",
      brand: "Adidas",
      size: 11,
      color: "STEEPLE GRAY/BELUGA/SOLAR RED",
      price: 345,
      description:
        "The adidas Yeezy Boost 350 V2 Reflective “Beluga” is a December 2021 release that updates the popular colorway of Kanye West’s casual lifestyle shoe with high-visibility reflective detailing. The original “Beluga” Yeezy Boost 350 V2 debuted back in September 2016 to much fanfare, and it is seen as one of the most desirable colorways of any adidas Yeezy shoe, 350 V2 or otherwise. The Reflective “Beluga” is a one-to-one remake of the 2016 version of the colorway, now with reflective material integrated into the Primeknit. The upper features a grey woven Primeknit upper with a contrasting Solar Red side stripes with contrasting “SPLY-350” branding. The marbled grey and black laces, as well as the upper, are treated with a reflective finish. A full-length Boost cushioned midsole provides a responsive ride. Release date: December 18, 2021.",
      stockCount: 15,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/064/334/468/original/848748_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/064/334/466/original/848748_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/064/334/474/original/848748_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/064/334/464/original/848748_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/064/334/473/original/848748_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "YEEZY BOOST 350 V2 ZEBRA",
      sku: "CP9654",
      brand: "Adidas",
      size: 7,
      color: "WHITE/CBLACK/RED",
      price: 615,
      description:
        "The Yeezy Boost 350 V2 'Zebra' released on February 25, 2017, combining an upper white / core black Primeknit with a red SPLY 350 branding and a full-length translucent midsole boost. On November 16, 2018 and April 9th, 2022, restocks of the ' Zebra ' arrived, with more pairs hitting the marketplace and building on Kanye's commitment to make Yeezy more available to anyone who wished to acquire them.",
      stockCount: 2,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/070/278/012/original/105568_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/070/278/010/original/105568_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/070/278/004/original/105568_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/070/278/001/original/105568_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/070/278/000/original/105568_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    // Product.create({
    //   productName: "YEEZY BOOST 350 V2 ZEBRA",
    //   sku: "CP9654",
    //   brand: "Adidas",
    //   size: 9.5,
    //   color: "WHITE/CBLACK/RED",
    //   price: 615,
    //   description:
    //     "The Yeezy Boost 350 V2 'Zebra' released on February 25, 2017, combining an upper white / core black Primeknit with a red SPLY 350 branding and a full-length translucent midsole boost. On November 16, 2018 and April 9th, 2022, restocks of the ' Zebra ' arrived, with more pairs hitting the marketplace and building on Kanye's commitment to make Yeezy more available to anyone who wished to acquire them.",
    //   stockCount: 3,
    //   imageURL: [
    //     "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/070/278/012/original/105568_01.jpg.jpeg?action=crop&width=2000",
    //     "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/070/278/010/original/105568_03.jpg.jpeg?action=crop&width=2000",
    //     "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/070/278/004/original/105568_04.jpg.jpeg?action=crop&width=2000",
    //     "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/070/278/001/original/105568_06.jpg.jpeg?action=crop&width=2000",
    //     "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/070/278/000/original/105568_08.jpg.jpeg?action=crop&width=2000",
    //   ],
    // }),
    Product.create({
      productName: "NMD_R1 PK",
      sku: "BZ0221",
      brand: "Adidas",
      size: 7,
      color: "FOOTWEARWHITE/FOOTWEARWHITE/FO",
      price: 200,
      description:
        "Twinned with an accompanying all-black colorway, the NMD R1 ‘Japan Triple White’ hit store shelves in 2017. adidas’ popular lifestyle runner dons a pristine white Primeknit upper with matching white details that include a molded heel tab and welded no-sew three-stripes. The lightweight construction up top is supported by a white Boost midsole, featuring Japanese branding on the smaller EVA plug.",
      stockCount: 12,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/077/929/556/original/151301_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/077/929/554/original/151301_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/077/929/551/original/151301_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/077/929/550/original/151301_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/078/081/408/original/151301_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "THE 10: AIR PRESTO OFF-WHITE",
      sku: "AA3830001",
      brand: "Nike",
      size: 9,
      color: "BLACK/BLACK-MUSLIN",
      price: 3500,
      description:
        "Without a doubt one of the most coveted models in all of Virgil Abloh’s ultra-hyped OFF-WHITE x Nike “THE TEN” collection, the Air Presto is considered by many to be the best shoe of 2017. Coinciding with the look of the rest of Virgil Abloh’s Nike sneakers, the Presto features an “inside out” appearance with an added heel strap, stitched on Swoosh and signature red zip tie. Few shoes are in higher demand right now than the OFF-WHITE Nike Air Presto, so don’t hesitate to pick up your pair while you still can.",
      stockCount: 3,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/070/041/246/original/182326_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/070/041/248/original/182326_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/070/041/242/original/182326_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/070/041/243/original/182326_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/070/041/239/original/182326_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "AIR FORCE 1 LOW OFF-WHITE - MCA",
      sku: "CI1173400",
      brand: "Nike",
      size: 12,
      color: "BLUE/BABY-BLUE",
      price: 2275,
      description:
        "The Off-White x Nike Air Force 1 “MCA” is another highly limited colorway of the iconic silhouette by Virgil Abloh. Released in celebration of Abloh’s career retrospective exhibit at the Museum of Contemporary Art in Chicago, the “MCA” colorway features the same leather construction of the coveted “ComplexCon” and “MoMA” versions of the Off-White x Air Force 1. This time the silhouette receives an eye-catching bright blue hue across the upper and sole, highlighted by metallic silver Swooshes and a red tab and zip tie. The Off-White x Nike Air Force 1 “MCA” released in very limited quantities in June 2019.",
      stockCount: 1,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/309/672/original/519943_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/309/674/original/519943_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/309/675/original/519943_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/309/686/original/519943_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/309/685/original/519943_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "PUMA MB.01 LAMELO BALL RICK AND MORTY",
      sku: "37668201",
      brand: "Puma",
      size: 9.5,
      color: "RED/GREEN",
      price: 160,
      description:
        "The Rick and Morty x Puma MB.01 “Mismatched” is a special collaboration between the animated television sitcom and Puma on LaMelo Ball’s first signature shoe. The basketball superstar’s favorite Adult Swim television show, “Rick and Morty,” is immortalized on his debut Puma MB.01 silhouette, and like his play on the hardwood, it warrants serious attention for its flashiness. The collaboration champions a mismatched design aesthetic that pairs a neon green finish on the left shoe with a head-turning bright red hue on the right shoe. “Rick and Morty” branding is found on the toe box and graphics inspired by the shoe appear on the lace overlay. Both the left and right shoe are designed from a lightweight mesh material. Underfoot, Puma’s proprietary Nitro Foam midsole provides a responsive ride. Release date: February 18, 2022.",
      stockCount: 59,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/067/906/121/original/893823_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/067/906/114/original/893823_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/067/906/123/original/893823_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/067/906/105/original/893823_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/067/906/101/original/893823_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
    Product.create({
      productName: "KYRIE 5 SBSP BT PATRICK",
      sku: "CJ6951600",
      brand: "Nike",
      size: 10,
      color: "LOTUS PINK/UNIVERSITY RED",
      price: 199,
      description:
        "In collaboration with Nickelodeon for the iconic show's 20th anniversary in August 2019, the SpongeBob SquarePants x Nike Kyrie 5 celebrates Irving's love for the cultural phenomenon. This 'Patrick' edition embodies the starfish's complexion in 'Lotus Pink' mesh with a tonal lace shroud and cratered external heel. A graphic of the character's face is printed on the sockliner. Its vibrant, dual-tone rubber outsole gives a last nod to the bumbling sea star.",
      stockCount: 11,
      imageURL: [
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/055/original/517887_01.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/056/original/517887_03.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/059/original/517887_04.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/067/original/517887_06.jpg.jpeg?action=crop&width=2000",
        "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/071/original/517887_08.jpg.jpeg?action=crop&width=2000",
      ],
    }),
  ]);

  //sample orders
  const orders = await Promise.all([
    Order.create({
      userId: 1,
    }),
    Order.create({ userId: 1, purchased: true }),
    Order.create({
      userId: 2,
    }),
  ]);

  //sample orderDetails
  const orderDetails = await Promise.all([
    OrderDetails.create({
      orderId: 1,
      productId: 1,
      numberOfItems: 5,
      totalPrice: 100,
    }),
    OrderDetails.create({
      orderId: 1,
      productId: 10,
      numberOfItems: 1,
      totalPrice: 50,
    }),
    OrderDetails.create({
      orderId: 2,
      productId: 4,
      numberOfItems: 1,
      totalPrice: 20,
    }),
    OrderDetails.create({
      orderId: 2,
      productId: 6,
      numberOfItems: 2,
      totalPrice: 40,
    }),
    OrderDetails.create({
      orderId: 3,
      productId: 8,
      numberOfItems: 1,
      totalPrice: 87,
    }),
  ]);

  console.log(`seeded ${users.length} users and ${products.length} products`);
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
