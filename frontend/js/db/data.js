
let products = [
    {
        id: 1, img: "../../images/image 1.jpg", productName: "Syltherine", productIntroduction: "Stylish cafe chair",
        DiscountPrice: 2500000, price: 3500000, discountPercent: 30, newProduct: false, discount: true
        , poster: true, type: "chair", imgSecoundMain: "../../images/product img CHALET chair.webp", imgSecound1: "../../images/Stylish cafe chair secound1.webp", imgSecound2: "../../images/product img CARROT chair.webp", imgSecound3: "../../images/product img AFRICA chair.webp", imgSecound4: "../../images/product img black chair.webp",
        description: "The Ottis restaurant table is one way restaurants can foster a more social experience for guests. It is the most cost effective way to increase seating capacity, generate more revenue and deliver on your guests's appetite for varied seating choices. Its clean look and robust built makes it perfect for industrial style decors as well as communal dining"
        , color1: "CHALET", color2: "CARROT", color3: "AFRICA", color4: "black"
        , count: 1,
    },

    {
        id: 2, img: "../../images/image 2.jpg", productName: "Leviosa", productIntroduction: "Stylish cafe chair",
        DiscountPrice: null, price: 2500000, discountPercent: 0, newProduct: false, discount: false
        , poster: false, type: "chair", imgSecoundMain: "../../images/product img gray chair.webp", imgSecound1: "../../images/product img brown chair.webp", imgSecound2: "../../images/chair -2.webp", imgSecound3: "../../images/product img LINEN chair.webp", imgSecound4: "../../images/chair -4.webp"
        , description: "The Invicta metal lounge arm chair accurately stands for cosmopolitan dining. Incorporating a luxurious lounge seating with a touch of glamour into your restaurant design is a way to deliver the VIP experience to your guests.A perfect mix of modern and chic, this padded metal chair is a great way to dress up your restaurant or cafe dining room. Upholstered in vinyl with two choices of colors, this chair utilizes high density foam padding for exceptional comfort. With a cut-out half circle back design and sleak metal legs, this accent arm chair adds a cozy space to any room.", color1: "gray", color2: "brown", color3: "LINEN", color4: "transparent"
        , count: 1,
    },

    {
        id: 3, img: "../../images/image 3.jpg", productName: "Lolito", productIntroduction: "Luxury big sofa",
        DiscountPrice: 7000000, price: 14000000, discountPercent: 50, newProduct: false, discount: true
        , poster: true, type: "sofa", imgSecoundMain: "../../images/product img STEAM sofa.webp", imgSecound1: "../../images/product img CHALET sofa.webp", imgSecound2: "../../images/product img gray sofa.webp", imgSecound3: "../../images/sofa  lolito main.webp 3.webp"
        , imgSecound4: "../../images/sofa  lolito main.webp 4.webp", description: "An angular display of modern comfort, the Jack Outdoor Sofa is a sophisticated piece that sets the tone for your outdoor design. Arranged around your outdoor table, you'll be moving all your summer meals outside.This item does not qualify for sales events and is unavailable for additional discounting or promotions", color1: "STEAM", color2: "CHALET", color3: "gray", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"
    },
    {
        id: 4, img: "../../images/image 4.jpg", productName: "Respira", productIntroduction: "Outdoor bar table and stool",
        DiscountPrice: null, price: 500000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "table", imgSecoundMain: "../../images/product img STEAM table.webp", imgSecound1: "../../images/table Respira main 1.webp", imgSecound2: "../../images/product img LINEN table.webp", imgSecound3: "../../images/table Respira main 3.webp", imgSecound4: "../../images/product img black table.webp", description: "Faux Teak and Aluminum will never rust and it will never rot, making these materials ideal for an outdoor restaurant table. This table is a great way to impart your restaurant patio or outdoor cafe with somber, architectural elegance. We have many sizes available, including most of the popular patio sizes. Pair with our matching bar stool, armchair, and side chair to complete your patio set."
        , color1: "STEAM", color2: "LINEN", color3: "black", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"

    },
    {
        id: 5, img: "../../images/image 1.jpg", productName: "Syltherine", productIntroduction: "Stylish cafe chair",
        DiscountPrice: 2500000, price: 3500000, discountPercent: 30, newProduct: false, discount: true
        , poster: true, type: "chair", imgSecoundMain: "../../images/product img CHALET chair.webp", imgSecound1: "../../images/Stylish cafe chair secound1.webp", imgSecound2: "../../images/product img CARROT chair.webp", imgSecound3: "../../images/product img AFRICA chair.webp", imgSecound4: "../../images/product img black chair.webp", description: "The Ottis restaurant table is one way restaurants can foster a more social experience for guests. It is the most cost effective way to increase seating capacity, generate more revenue and deliver on your guests's appetite for varied seating choices. Its clean look and robust built makes it perfect for industrial style decors as well as communal dining"
        , color1: "CHALET", color2: "CARROT", color3: "AFRICA", color4: "black"
        , count: 1, colorActive: "CHALET", sizeActive: "L"
    },

    {
        id: 6, img: "../../images/image 2.jpg", productName: "Leviosa", productIntroduction: "Stylish cafe chair",
        DiscountPrice: null, price: 2500000, discountPercent: 0, newProduct: false, discount: false
        , poster: false, type: "chair", imgSecoundMain: "../../images/product img gray chair.webp", imgSecound1: "../../images/product img brown chair.webp", imgSecound2: "../../images/chair -2.webp", imgSecound3: "../../images/product img LINEN chair.webp", imgSecound4: "../../images/chair -4.webp"
        , description: "The Invicta metal lounge arm chair accurately stands for cosmopolitan dining. Incorporating a luxurious lounge seating with a touch of glamour into your restaurant design is a way to deliver the VIP experience to your guests.A perfect mix of modern and chic, this padded metal chair is a great way to dress up your restaurant or cafe dining room. Upholstered in vinyl with two choices of colors, this chair utilizes high density foam padding for exceptional comfort. With a cut-out half circle back design and sleak metal legs, this accent arm chair adds a cozy space to any room.", color1: "gray", color2: "brown", color3: "LINEN", color4: "transparent"
        , count: 1, colorActive: "gray", sizeActive: "L"
    },

    {
        id: 7, img: "../../images/image 3.jpg", productName: "Lolito", productIntroduction: "Luxury big sofa",
        DiscountPrice: 7000000, price: 14000000, discountPercent: 50, newProduct: false, discount: true
        , poster: true, type: "sofa", imgSecoundMain: "../../images/product img STEAM sofa.webp", imgSecound1: "../../images/product img CHALET sofa.webp", imgSecound2: "../../images/product img gray sofa.webp", imgSecound3: "../../images/sofa  lolito main.webp 3.webp"
        , imgSecound4: "../../images/sofa  lolito main.webp 4.webp", description: "An angular display of modern comfort, the Jack Outdoor Sofa is a sophisticated piece that sets the tone for your outdoor design. Arranged around your outdoor table, you'll be moving all your summer meals outside.This item does not qualify for sales events and is unavailable for additional discounting or promotions", color1: "STEAM", color2: "CHALET", color3: "gray", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"
    },

    {
        id: 8, img: "../../images/image 4.jpg", productName: "Respira", productIntroduction: "Outdoor bar table and stool",
        DiscountPrice: null, price: 500000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "table", imgSecoundMain: "../../images/product img STEAM table.webp", imgSecound1: "../../images/table Respira main 1.webp", imgSecound2: "../../images/product img LINEN table.webp", imgSecound3: "../../images/table Respira main 3.webp", imgSecound4: "../../images/product img black table.webp", description: "Faux Teak and Aluminum will never rust and it will never rot, making these materials ideal for an outdoor restaurant table. This table is a great way to impart your restaurant patio or outdoor cafe with somber, architectural elegance. We have many sizes available, including most of the popular patio sizes. Pair with our matching bar stool, armchair, and side chair to complete your patio set.", color1: "STEAM", color2: "LINEN", color3: "black", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"
    },

    {

        id: 9, img: "../../images/image 1.jpg", productName: "Syltherine", productIntroduction: "Stylish cafe chair",
        DiscountPrice: 2500000, price: 3500000, discountPercent: 30, newProduct: false, discount: true
        , poster: true, type: "chair", imgSecoundMain: "../../images/product img CHALET chair.webp", imgSecound1: "../../images/Stylish cafe chair secound1.webp", imgSecound2: "../../images/product img CARROT chair.webp", imgSecound3: "../../images/product img AFRICA chair.webp", imgSecound4: "../../images/product img black chair.webp", description: "The Ottis restaurant table is one way restaurants can foster a more social experience for guests. It is the most cost effective way to increase seating capacity, generate more revenue and deliver on your guests's appetite for varied seating choices. Its clean look and robust built makes it perfect for industrial style decors as well as communal dining"
        , color1: "CHALET", color2: "CARROT", color3: "AFRICA", color4: "black"
        , count: 1, colorActive: "CHALET", sizeActive: "L"
    },

    {
        id: 10, img: "../../images/image 2.jpg", productName: "Leviosa", productIntroduction: "Stylish cafe chair",
        DiscountPrice: null, price: 2500000, discountPercent: 0, newProduct: false, discount: false
        , poster: false, type: "chair", imgSecoundMain: "../../images/product img gray chair.webp", imgSecound1: "../../images/product img brown chair.webp", imgSecound2: "../../images/chair -2.webp", imgSecound3: "../../images/product img LINEN chair.webp", imgSecound4: "../../images/chair -4.webp"
        , description: "The Invicta metal lounge arm chair accurately stands for cosmopolitan dining. Incorporating a luxurious lounge seating with a touch of glamour into your restaurant design is a way to deliver the VIP experience to your guests.A perfect mix of modern and chic, this padded metal chair is a great way to dress up your restaurant or cafe dining room. Upholstered in vinyl with two choices of colors, this chair utilizes high density foam padding for exceptional comfort. With a cut-out half circle back design and sleak metal legs, this accent arm chair adds a cozy space to any room."
        , color1: "gray", color2: "brown", color3: "LINEN", color4: "transparent"
        , count: 1, colorActive: "gray", sizeActive: "L"
    },

    {
        id: 11, img: "../../images/image 3.jpg", productName: "Lolito", productIntroduction: "Luxury big sofa",
        DiscountPrice: 7000000, price: 14000000, discountPercent: 50, newProduct: false, discount: true
        , poster: true, type: "sofa", imgSecoundMain: "../../images/product img STEAM sofa.webp", imgSecound1: "../../images/product img CHALET sofa.webp", imgSecound2: "../../images/product img gray sofa.webp", imgSecound3: "../../images/sofa  lolito main.webp 3.webp"
        , imgSecound4: "../../images/sofa  lolito main.webp 4.webp", description: "An angular display of modern comfort, the Jack Outdoor Sofa is a sophisticated piece that sets the tone for your outdoor design. Arranged around your outdoor table, you'll be moving all your summer meals outside.This item does not qualify for sales events and is unavailable for additional discounting or promotions", color1: "STEAM", color2: "CHALET", color3: "gray", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"
    },

    {
        id: 12, img: "../../images/image 4.jpg", productName: "Respira", productIntroduction: "Outdoor bar table and stool",
        DiscountPrice: null, price: 500000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "table", imgSecoundMain: "../../images/product img STEAM table.webp", imgSecound1: "../../images/table Respira main 1.webp", imgSecound2: "../../images/product img LINEN table.webp", imgSecound3: "../../images/table Respira main 3.webp", imgSecound4: "../../images/product img black table.webp", description: "Faux Teak and Aluminum will never rust and it will never rot, making these materials ideal for an outdoor restaurant table. This table is a great way to impart your restaurant patio or outdoor cafe with somber, architectural elegance. We have many sizes available, including most of the popular patio sizes. Pair with our matching bar stool, armchair, and side chair to complete your patio set.", color1: "STEAM", color2: "LINEN", color3: "black", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"

    },
    {
        id: 13, img: "../../images/image 1.jpg", productName: "Syltherine", productIntroduction: "Stylish cafe chair",
        DiscountPrice: 2500000, price: 3500000, discountPercent: 30, newProduct: false, discount: true
        , poster: true, type: "chair", imgSecoundMain: "../../images/product img CHALET chair.webp", imgSecound1: "../../images/Stylish cafe chair secound1.webp", imgSecound2: "../../images/product img CARROT chair.webp", imgSecound3: "../../images/product img AFRICA chair.webp", imgSecound4: "../../images/product img black chair.webp", description: "The Ottis restaurant table is one way restaurants can foster a more social experience for guests. It is the most cost effective way to increase seating capacity, generate more revenue and deliver on your guests's appetite for varied seating choices. Its clean look and robust built makes it perfect for industrial style decors as well as communal dining"
        , color1: "CHALET", color2: "CARROT", color3: "AFRICA", color4: "black"
        , count: 1, colorActive: "CHALET", sizeActive: "L"
    },

    {
        id: 14, img: "../../images/image 2.jpg", productName: "Leviosa", productIntroduction: "Stylish cafe chair",
        DiscountPrice: null, price: 2500000, discountPercent: 0, newProduct: false, discount: false
        , poster: false, type: "chair", imgSecoundMain: "../../images/product img gray chair.webp", imgSecound1: "../../images/product img brown chair.webp", imgSecound2: "../../images/chair -2.webp", imgSecound3: "../../images/product img LINEN chair.webp", imgSecound4: "../../images/chair -4.webp"
        , description: "The Invicta metal lounge arm chair accurately stands for cosmopolitan dining. Incorporating a luxurious lounge seating with a touch of glamour into your restaurant design is a way to deliver the VIP experience to your guests.A perfect mix of modern and chic, this padded metal chair is a great way to dress up your restaurant or cafe dining room. Upholstered in vinyl with two choices of colors, this chair utilizes high density foam padding for exceptional comfort. With a cut-out half circle back design and sleak metal legs, this accent arm chair adds a cozy space to any room.", color1: "gray", color2: "brown", color3: "LINEN", color4: "transparent"
        , count: 1, colorActive: "gray", sizeActive: "L"
    },

    {
        id: 15, img: "../../images/image 3.jpg", productName: "Lolito", productIntroduction: "Luxury big sofa",
        DiscountPrice: 7000000, price: 14000000, discountPercent: 50, newProduct: false, discount: true
        , poster: true, type: "sofa", imgSecoundMain: "../../images/product img STEAM sofa.webp", imgSecound1: "../../images/product img CHALET sofa.webp", imgSecound2: "../../images/product img gray sofa.webp", imgSecound3: "../../images/sofa  lolito main.webp 3.webp"
        , imgSecound4: "../../images/sofa  lolito main.webp 4.webp", description: "An angular display of modern comfort, the Jack Outdoor Sofa is a sophisticated piece that sets the tone for your outdoor design. Arranged around your outdoor table, you'll be moving all your summer meals outside.This item does not qualify for sales events and is unavailable for additional discounting or promotions", color1: "STEAM", color2: "CHALET", color3: "gray", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"
    },

    {
        id: 16, img: "../../images/image 4.jpg", productName: "Respira", productIntroduction: "Outdoor bar table and stool",
        DiscountPrice: null, price: 500000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "table", imgSecoundMain: "../../images/product img STEAM table.webp", imgSecound1: "../../images/table Respira main 1.webp", imgSecound2: "../../images/product img LINEN table.webp", imgSecound3: "../../images/table Respira main 3.webp", imgSecound4: "../../images/product img black table.webp", description: "Faux Teak and Aluminum will never rust and it will never rot, making these materials ideal for an outdoor restaurant table. This table is a great way to impart your restaurant patio or outdoor cafe with somber, architectural elegance. We have many sizes available, including most of the popular patio sizes. Pair with our matching bar stool, armchair, and side chair to complete your patio set.", color1: "STEAM", color2: "LINEN", color3: "black", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"
    },
    {
        id: 17, img: "../../images/Image 5.png", productName: "Grifo", productIntroduction: "Night lamp",
        DiscountPrice: null, price: 1500000, discountPercent: 0, newProduct: false, discount: false
        , poster: false, type: "lamp", imgSecoundMain: "../../images/product img CHALET lamp.webp", imgSecound1: "../../images/Grifo night lamp 1.webp", imgSecound2: "../../images/product img AFRICA lamp.webp", imgSecound3: "../../images/product img STEAM lamp.webp", imgSecound4: "../../images/product img gold lamp.webp", description: "This unique fixture is the perfect piece to elevate your home dcor with texture, natural elements, and a high-end gold color. This lamp base is made from polyresin and steel, creating a gorgeous lighting fixture that is sure to bring a sense of style into your home.Features - Due to the production process, each piece is unique and no two are exactly alike.This wonderful fixture shows off a unique shape and stunning design.The complementary oatmeal colored lamp shade perfectly brings this look together.Specification - Location Rating - Dry"
        , color1: "CHALET", color2: "AFRICA", color3: "STEAM", color4: "gold", count: 1, colorActive: "CHALET", sizeActive: "L"

    },
    {
        id: 18, img: "../../images/image 6.jpg", productName: "Muggo", productIntroduction: "Small mug",
        DiscountPrice: null, price: 150000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "mug", imgSecoundMain: "../../images/product img black mug.webp", imgSecound1: "../../images/Small mug img 1.webp", imgSecound2: "../../images/Small mug img 2.webp", imgSecound3: "../../product img gold mug.webp", imgSecound4: "../../images/product img STEAM mug.webp",
        description: "Cup Warmer for Coffee with Automatic Sensor Coffee Warmer for Desk auto Shut Off & on Coffee Cup Warmer for Tea, Water, Milk,Black Without Cup", color1: "black", color2: "gold", color3: "STEAM", color4: "transparent"
        , count: 1, colorActive: "black", sizeActive: "L"
    },
    {
        id: 19, img: "../../images/image 7.jpg", productName: "Pingky", productIntroduction: "Cute bed set",
        DiscountPrice: 7000000, price: 14000000, discountPercent: 25, newProduct: false, discount: true
        , poster: true, type: "bed set", imgSecoundMain: "../../images/product img pink bed set.webp", imgSecound1: "../../images/Cute bed set img1.jpg", imgSecound2: "../../images/Cute bed set img1.jpg", imgSecound3: "../../images/Cute bed set img2.jpg", imgSecound4: "../../images/Cute bed set img4.jpg",
        description: "72Modern Velvet Sofa Bed Futon, Convertible Folding Sleeper Bed Couches with 3 Adjustable Backrests, Tufted Recliner Loveseat with Golden Chrome Legs for Small Living Room Office", color1: "pink", color2: "transparent", color3: "transparent", color4: "transparent"
        , count: 1, colorActive: "pink", sizeActive: "L"
    },

    {
        id: 20, img: "../../images/Images8.jpg", productName: "Potty", productIntroduction: "Minimalist flower pot",
        DiscountPrice: null, price: 500000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "pot", imgSecoundMain: "../../images/product img STEAM pot.webp", imgSecound1: "../../images/potty 1.webp", imgSecound2: "../../images/potty 2.webp", imgSecound3: "../../images/potty 3.webp", imgSecound4: "../../images/potty 4.webp",
        description: "Ceramic White Toilet Plant Pot/Bonsai Pot/Flower Pot/Succulent Planter 4.6 Ideal Gifts for Women, Mom or Birthdays"
        , color1: "STEAM", color2: "transparent", color3: "transparent", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"
    },

    {
        id: 21, img: "../../images/Image 5.png", productName: "Grifo", productIntroduction: "Night lamp",
        DiscountPrice: null, price: 1500000, discountPercent: 0, newProduct: false, discount: false
        , poster: false, type: "lamp", imgSecoundMain: "../../images/product img CHALET lamp.webp", imgSecound1: "../../images/product img CHALET lamp.webp", imgSecound2: " ../../images/product img AFRICA lamp.webp", imgSecound3: "../../images/product img STEAM lamp.webp", imgSecound4: "../../images/product img gold lamp.webp", description: "This unique fixture is the perfect piece to elevate your home dcor with texture, natural elements, and a high-end gold color. This lamp base is made from polyresin and steel, creating a gorgeous lighting fixture that is sure to bring a sense of style into your home.Features - Due to the production process, each piece is unique and no two are exactly alike.This wonderful fixture shows off a unique shape and stunning design.The complementary oatmeal colored lamp shade perfectly brings this look together.Specification - Location Rating - Dry", color1: "CHALET", color2: "AFRICA", color3: "STEAM", color4: "gold"
        , count: 1, colorActive: "CHALET", sizeActive: "L"
    },
    {
        id: 22, img: "../../images/image 6.jpg", productName: "Muggo", productIntroduction: "Small mug",
        DiscountPrice: null, price: 150000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "mug", imgSecoundMain: "../../images/product img black mug.webp", imgSecound1: "../../images/Small mug img 1.webp", imgSecound2: "../../images/Small mug img 2.webp", imgSecound3: "../../product img gold mug.webp", imgSecound4: "../../images/product img STEAM mug.webp",
        description: "Cup Warmer for Coffee with Automatic Sensor Coffee Warmer for Desk auto Shut Off & on Coffee Cup Warmer for Tea, Water, Milk,Black Without Cup", color1: "black", color2: "gold", color3: "STEAM", color4: "transparent"
        , count: 1, colorActive: "black", sizeActive: "L"
    },
    {
        id: 23, img: "../../images/image 7.jpg", productName: "Pingky", productIntroduction: "Cute bed set",
        DiscountPrice: 7000000, price: 14000000, discountPercent: 25, newProduct: false, discount: true
        , poster: true, type: "bed set", imgSecoundMain: "../../images/product img pink bed set.webp", imgSecound1: "../../images/Cute bed set img1.jpg", imgSecound2: "../../images/Cute bed set img1.jpg", imgSecound3: "../../images/Cute bed set img2.jpg", imgSecound4: "../../images/Cute bed set img4.jpg",
        description: "72Modern Velvet Sofa Bed Futon, Convertible Folding Sleeper Bed Couches with 3 Adjustable Backrests, Tufted Recliner Loveseat with Golden Chrome Legs for Small Living Room Office", color1: "pink", color2: "transparent", color3: "transparent", color4: "transparent"
        , count: 1, colorActive: "pink", sizeActive: "L"
    },

    {
        id: 24, img: "../../images/Images8.jpg", productName: "Potty", productIntroduction: "Minimalist flower pot",
        DiscountPrice: null, price: 500000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "pot", imgSecoundMain: "../../images/product img STEAM pot.webp", imgSecound1: "../../images/potty 1.webp", imgSecound2: "../../images/potty 2.webp", imgSecound3: "../../images/potty 3.webp", imgSecound4: "../../images/potty 4.webp",
        description: "Ceramic White Toilet Plant Pot/Bonsai Pot/Flower Pot/Succulent Planter 4.6 Ideal Gifts for Women, Mom or Birthdays", color1: "STEAM", color2: "transparent", color3: "transparent", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"
    },
    {
        id: 25, img: "../../images/Image 5.png", productName: "Grifo", productIntroduction: "Night lamp",
        DiscountPrice: null, price: 1500000, discountPercent: 0, newProduct: false, discount: false
        , poster: false, type: "lamp", imgSecoundMain: "../../images/product img CHALET lamp.webp", imgSecound1: "../../images/product img CHALET lamp.webp", imgSecound2: " ../../images/product img AFRICA lamp.webp", imgSecound3: "../../images/product img STEAM lamp.webp", imgSecound4: "../../images/product img gold lamp.webp", description: "This unique fixture is the perfect piece to elevate your home dcor with texture, natural elements, and a high-end gold color. This lamp base is made from polyresin and steel, creating a gorgeous lighting fixture that is sure to bring a sense of style into your home.Features - Due to the production process, each piece is unique and no two are exactly alike.This wonderful fixture shows off a unique shape and stunning design.The complementary oatmeal colored lamp shade perfectly brings this look together.Specification - Location Rating - Dry", color1: "CHALET", color2: "AFRICA", color3: "STEAM", color4: "gold"
        , count: 1, colorActive: "CHALET", sizeActive: "L"
    },
    {
        id: 26, img: "../../images/image 6.jpg", productName: "Muggo", productIntroduction: "Small mug",
        DiscountPrice: null, price: 150000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "mug", imgSecoundMain: "../../images/product img black mug.webp", imgSecound1: "../../images/Small mug img 1.webp", imgSecound2: "../../images/Small mug img 2.webp", imgSecound3: "/Furniro/images/product img gold mug.webp", imgSecound4: "../../images/product img STEAM mug.webp",
        description: "Cup Warmer for Coffee with Automatic Sensor Coffee Warmer for Desk auto Shut Off & on Coffee Cup Warmer for Tea, Water, Milk,Black Without Cup", color1: "black", color2: "gold", color3: "STEAM", color4: "transparent"
        , count: 1, colorActive: "black", sizeActive: "L"

    },
    {
        id: 27, img: "../../images/image 7.jpg", productName: "Pingky", productIntroduction: "Cute bed set",
        DiscountPrice: 7000000, price: 14000000, discountPercent: 25, newProduct: false, discount: true
        , poster: true, type: "bed set", imgSecoundMain: "../../images/product img pink bed set.webp", imgSecound1: "../../images/Cute bed set img1.jpg", imgSecound2: "../../images/Cute bed set img1.jpg", imgSecound3: "../../images/Cute bed set img2.jpg", imgSecound4: "../../images/Cute bed set img4.jpg",
        description: "72Modern Velvet Sofa Bed Futon, Convertible Folding Sleeper Bed Couches with 3 Adjustable Backrests, Tufted Recliner Loveseat with Golden Chrome Legs for Small Living Room Office", color1: "pink", color2: "transparent", color3: "transparent", color4: "transparent"
        , count: 1, colorActive: "pink", sizeActive: "L"
    },

    {
        id: 28, img: "../../images/Images8.jpg", productName: "Potty", productIntroduction: "Minimalist flower pot",
        DiscountPrice: null, price: 500000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "pot", imgSecoundMain: "../../images/product img STEAM pot.webp", imgSecound1: "../../images/potty 1.webp", imgSecound2: "../../images/potty 2.webp", imgSecound3: "../../images/potty 3.webp", imgSecound4: "../../images/potty 4.webp",
        description: "Ceramic White Toilet Plant Pot/Bonsai Pot/Flower Pot/Succulent Planter 4.6 Ideal Gifts for Women, Mom or Birthdays", color1: "STEAM", color2: "transparent", color3: "transparent", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"
    },
    {
        id: 29, img: "../../images/Image 5.png", productName: "Grifo", productIntroduction: "Night lamp",
        DiscountPrice: null, price: 1500000, discountPercent: 0, newProduct: false, discount: false
        , poster: false, type: "lamp", imgSecoundMain: "../../images/product img CHALET lamp.webp", imgSecound1: "../../images/product img CHALET lamp.webp", imgSecound2: " ../../images/product img AFRICA lamp.webp", imgSecound3: "../../images/product img STEAM lamp.webp", imgSecound4: "../../images/product img gold lamp.webp", description: "This unique fixture is the perfect piece to elevate your home dcor with texture, natural elements, and a high-end gold color. This lamp base is made from polyresin and steel, creating a gorgeous lighting fixture that is sure to bring a sense of style into your home.Features - Due to the production process, each piece is unique and no two are exactly alike.This wonderful fixture shows off a unique shape and stunning design.The complementary oatmeal colored lamp shade perfectly brings this look together.Specification - Location Rating - Dry", color1: "CHALET", color2: "AFRICA", color3: "STEAM", color4: "gold"
        , count: 1, colorActive: "CHALET", sizeActive: "L"
    },
    {
        id: 30, img: "../../images/image 6.jpg", productName: "Muggo", productIntroduction: "Small mug",
        DiscountPrice: null, price: 150000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "mug", imgSecoundMain: "../../images/product img black mug.webp", imgSecound1: "../../images/Small mug img 1.webp", imgSecound2: "../../images/Small mug img 2.webp", imgSecound3: "../../product img gold mug.webp", imgSecound4: "../../images/product img STEAM mug.webp",
        description: "Cup Warmer for Coffee with Automatic Sensor Coffee Warmer for Desk auto Shut Off & on Coffee Cup Warmer for Tea, Water, Milk,Black Without Cup", color1: "black", color2: "gold", color3: "STEAM", color4: "transparent"
        , count: 1, colorActive: "black", sizeActive: "L"

    },
    {
        id: 31, img: "../../images/image 7.jpg", productName: "Pingky", productIntroduction: "Cute bed set",
        DiscountPrice: 7000000, price: 14000000, discountPercent: 25, newProduct: false, discount: true
        , poster: true, type: "bed set", imgSecoundMain: "../../images/product img pink bed set.webp", imgSecound1: "../../images/Cute bed set img1.jpg", imgSecound2: "../../images/Cute bed set img1.jpg", imgSecound3: "../../images/Cute bed set img2.jpg", imgSecound4: "../../images/Cute bed set img4.jpg",
        description: "72Modern Velvet Sofa Bed Futon, Convertible Folding Sleeper Bed Couches with 3 Adjustable Backrests, Tufted Recliner Loveseat with Golden Chrome Legs for Small Living Room Office", color1: "pink", color2: "transparent", color3: "transparent", color4: "transparent", count: 1, colorActive: "pink", sizeActive: "L"
    },

    {
        id: 32, img: "../../images/Images8.jpg", productName: "Potty", productIntroduction: "Minimalist flower pot",
        DiscountPrice: null, price: 500000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "pot", imgSecoundMain: "../../images/product img STEAM pot.webp", imgSecound1: "../../images/potty 1.webp", imgSecound2: "../../images/potty 2.webp", imgSecound3: "../../images/potty 3.webp", imgSecound4: "../../images/potty 4.webp",
        description: "Ceramic White Toilet Plant Pot/Bonsai Pot/Flower Pot/Succulent Planter 4.6 Ideal Gifts for Women, Mom or Birthdays", color1: "STEAM", color2: "transparent", color3: "transparent", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"
    },
    {
        id: 33, img: "../../images/image 1.jpg", productName: "Syltherine", productIntroduction: "Stylish cafe chair",
        DiscountPrice: 2500000, price: 3500000, discountPercent: 30, newProduct: false, discount: true
        , poster: true, type: "chair", imgSecoundMain: "../../images/product img CHALET chair.webp", imgSecound1: "../../images/Stylish cafe chair secound1.webp", imgSecound2: "../../images/product img CARROT chair.webp", imgSecound3: "../../images/product img AFRICA chair.webp", imgSecound4: "../../images/product img black chair.webp", description: "The Ottis restaurant table is one way restaurants can foster a more social experience for guests. It is the most cost effective way to increase seating capacity, generate more revenue and deliver on your guests's appetite for varied seating choices. Its clean look and robust built makes it perfect for industrial style decors as well as communal dining"
        , color1: "CHALET", color2: "CARROT", color3: "AFRICA", color4: "black"
    },
    {
        id: 34, img: "../../images/image 2.jpg", productName: "Leviosa", productIntroduction: "Stylish cafe chair",
        DiscountPrice: null, price: 2500000, discountPercent: 0, newProduct: false, discount: false
        , poster: false, type: "chair", imgSecoundMain: "../../images/product img gray chair.webp", imgSecound1: "../../images/product img brown chair.webp", imgSecound2: "../../images/chair -2.webp", imgSecound3: "../../images/product img LINEN chair.webp", imgSecound4: "../../images/chair -4.webp"
        , description: "The Invicta metal lounge arm chair accurately stands for cosmopolitan dining. Incorporating a luxurious lounge seating with a touch of glamour into your restaurant design is a way to deliver the VIP experience to your guests.A perfect mix of modern and chic, this padded metal chair is a great way to dress up your restaurant or cafe dining room. Upholstered in vinyl with two choices of colors, this chair utilizes high density foam padding for exceptional comfort. With a cut-out half circle back design and sleak metal legs, this accent arm chair adds a cozy space to any room."
        , color1: "gray", color2: "brown", color3: "LINEN", color4: "transparent"
        , count: 1, colorActive: "gray", sizeActive: "L"
    },
    {
        id: 35, img: "../../images/image 3.jpg", productName: "Lolito", productIntroduction: "Luxury big sofa",
        DiscountPrice: 7000000, price: 14000000, discountPercent: 50, newProduct: false, discount: true
        , poster: true, type: "sofa", imgSecoundMain: "../../images/product img STEAM sofa.webp", imgSecound1: "../../images/product img CHALET sofa.webp", imgSecound2: "../../images/product img gray sofa.webp", imgSecound3: "../../images/sofa  lolito main.webp 3.webp"
        , imgSecound4: "../../images/sofa  lolito main.webp 4.webp", description: "An angular display of modern comfort, the Jack Outdoor Sofa is a sophisticated piece that sets the tone for your outdoor design. Arranged around your outdoor table, you'll be moving all your summer meals outside.This item does not qualify for sales events and is unavailable for additional discounting or promotions", color1: "STEAM", color2: "CHALET", color3: "gray", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"
    },
    {
        id: 36, img: "../../images/image 4.jpg", productName: "Respira", productIntroduction: "Outdoor bar table and stool",
        DiscountPrice: null, price: 500000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "table", imgSecoundMain: "../../images/product img STEAM table.webp", imgSecound1: "../../images/table Respira main 1.webp", imgSecound2: "../../images/product img LINEN table.webp", imgSecound3: "../../images/table Respira main 3.webp", imgSecound4: "../../images/product img black table.webp", description: "Faux Teak and Aluminum will never rust and it will never rot, making these materials ideal for an outdoor restaurant table. This table is a great way to impart your restaurant patio or outdoor cafe with somber, architectural elegance. We have many sizes available, including most of the popular patio sizes. Pair with our matching bar stool, armchair, and side chair to complete your patio set.", color1: "STEAM", color2: "LINEN", color3: "black", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"
    },
    {
        id: 37, img: "../../images/image 1.jpg", productName: "Syltherine", productIntroduction: "Stylish cafe chair",
        DiscountPrice: 2500000, price: 3500000, discountPercent: 30, newProduct: false, discount: true
        , poster: true, type: "chair", imgSecoundMain: "../../images/product img CHALET chair.webp", imgSecound1: "../../images/Stylish cafe chair secound1.webp", imgSecound2: "../../images/product img CARROT chair.webp", imgSecound3: "../../images/product img AFRICA chair.webp", imgSecound4: "../../images/product img black chair.webp", description: "The Ottis restaurant table is one way restaurants can foster a more social experience for guests. It is the most cost effective way to increase seating capacity, generate more revenue and deliver on your guests's appetite for varied seating choices. Its clean look and robust built makes it perfect for industrial style decors as well as communal dining"
        , color1: "CHALET", color2: "CARROT", color3: "AFRICA", color4: "black"
        , count: 1, colorActive: "CHALET", sizeActive: "L"
    },
    {
        id: 38, img: "../../images/image 2.jpg", productName: "Leviosa", productIntroduction: "Stylish cafe chair",
        DiscountPrice: null, price: 2500000, discountPercent: 0, newProduct: false, discount: false
        , poster: false, type: "chair", imgSecoundMain: "../../images/product img gray chair.webp", imgSecound1: "../../images/product img brown chair.webp", imgSecound2: "../../images/chair -2.webp", imgSecound3: "../../images/product img LINEN chair.webp", imgSecound4: "../../images/chair -4.webp"
        , description: "The Invicta metal lounge arm chair accurately stands for cosmopolitan dining. Incorporating a luxurious lounge seating with a touch of glamour into your restaurant design is a way to deliver the VIP experience to your guests.A perfect mix of modern and chic, this padded metal chair is a great way to dress up your restaurant or cafe dining room. Upholstered in vinyl with two choices of colors, this chair utilizes high density foam padding for exceptional comfort. With a cut-out half circle back design and sleak metal legs, this accent arm chair adds a cozy space to any room."
        , color1: "gray", color2: "brown", color3: "LINEN", color4: "transparent"
        , count: 1, colorActive: "gray", sizeActive: "L"
    },
    {
        id: 39, img: "../../images/image 3.jpg", productName: "Lolito", productIntroduction: "Luxury big sofa",
        DiscountPrice: 7000000, price: 14000000, discountPercent: 50, newProduct: false, discount: true
        , poster: true, type: "sofa", imgSecoundMain: "../../images/product img STEAM sofa.webp", imgSecound1: "../../images/product img CHALET sofa.webp", imgSecound2: "../../images/product img gray sofa.webp", imgSecound3: "../../images/sofa  lolito main.webp 3.webp"
        , imgSecound4: "../../images/sofa  lolito main.webp 4.webp", description: "An angular display of modern comfort, the Jack Outdoor Sofa is a sophisticated piece that sets the tone for your outdoor design. Arranged around your outdoor table, you'll be moving all your summer meals outside.This item does not qualify for sales events and is unavailable for additional discounting or promotions", color1: "STEAM", color2: "CHALET", color3: "gray", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"
    },
    {
        id: 40, img: "../../images/image 4.jpg", productName: "Respira", productIntroduction: "Outdoor bar table and stool",
        DiscountPrice: null, price: 500000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "table", imgSecoundMain: "../../images/product img STEAM table.webp", imgSecound1: "../../images/table Respira main 1.webp", imgSecound2: "../../images/product img LINEN table.webp", imgSecound3: "../../images/table Respira main 3.webp", imgSecound4: "../../images/product img black table.webp", description: "Faux Teak and Aluminum will never rust and it will never rot, making these materials ideal for an outdoor restaurant table. This table is a great way to impart your restaurant patio or outdoor cafe with somber, architectural elegance. We have many sizes available, including most of the popular patio sizes. Pair with our matching bar stool, armchair, and side chair to complete your patio set.", color1: "STEAM", color2: "LINEN", color3: "black", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"
    },
    {
        id: 41, img: "../../images/Image 5.png", productName: "Grifo", productIntroduction: "Night lamp",
        DiscountPrice: null, price: 1500000, discountPercent: 0, newProduct: false, discount: false
        , poster: false, type: "lamp", imgSecoundMain: "../../images/product img CHALET lamp.webp", imgSecound1: "../../images/product img CHALET lamp.webp", imgSecound2: "/Furniro/images/product img AFRICA lamp.webp", imgSecound3: "../../images/product img STEAM lamp.webp", imgSecound4: "../../images/product img gold lamp.webp", description: "This unique fixture is the perfect piece to elevate your home dcor with texture, natural elements, and a high-end gold color. This lamp base is made from polyresin and steel, creating a gorgeous lighting fixture that is sure to bring a sense of style into your home.Features - Due to the production process, each piece is unique and no two are exactly alike.This wonderful fixture shows off a unique shape and stunning design.The complementary oatmeal colored lamp shade perfectly brings this look together.Specification - Location Rating - Dry", color1: "CHALET", color2: "AFRICA", color3: "STEAM", color4: "gold"
        , count: 1, colorActive: "CHALET", sizeActive: "L"
    },
    {
        id: 42, img: "../../images/image 6.jpg", productName: "Muggo", productIntroduction: "Small mug",
        DiscountPrice: null, price: 150000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "mug", imgSecoundMain: "../../images/product img black mug.webp", imgSecound1: "../../images/Small mug img 1.webp", imgSecound2: "../../images/Small mug img 2.webp", imgSecound3: "/Furniro/images/product img gold mug.webp", imgSecound4: "../../images/product img STEAM mug.webp",
        description: "Cup Warmer for Coffee with Automatic Sensor Coffee Warmer for Desk auto Shut Off & on Coffee Cup Warmer for Tea, Water, Milk,Black Without Cup", color1: "black", color2: "gold", color3: "STEAM", color4: "transparent"
        , count: 1, colorActive: "black", sizeActive: "L"

    },
    {
        id: 43, img: "../../images/image 7.jpg", productName: "Pingky", productIntroduction: "Cute bed set",
        DiscountPrice: 7000000, price: 14000000, discountPercent: 25, newProduct: false, discount: true
        , poster: true, type: "bed set", imgSecoundMain: "../../images/product img pink bed set.webp", imgSecound1: "../../images/Cute bed set img1.jpg", imgSecound2: "../../images/Cute bed set img1.jpg", imgSecound3: "../../images/Cute bed set img2.jpg", imgSecound4: "../../images/Cute bed set img4.jpg",
        description: "72Modern Velvet Sofa Bed Futon, Convertible Folding Sleeper Bed Couches with 3 Adjustable Backrests, Tufted Recliner Loveseat with Golden Chrome Legs for Small Living Room Office", color1: "pink", color2: "transparent", color3: "transparent", color4: "transparent", count: 1, colorActive: "pink", sizeActive: "L"
    },
    {
        id: 44, img: "../../images/Images8.jpg", productName: "Potty", productIntroduction: "Minimalist flower pot",
        DiscountPrice: null, price: 500000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "pot", imgSecoundMain: "../../images/product img STEAM pot.webp", imgSecound1: "../../images/potty 1.webp", imgSecound2: "../../images/potty 2.webp", imgSecound3: "../../images/potty 3.webp", imgSecound4: "images/potty 4.webp",
        description: "Ceramic White Toilet Plant Pot/Bonsai Pot/Flower Pot/Succulent Planter 4.6 Ideal Gifts for Women, Mom or Birthdays", color1: "STEAM", color2: "transparent", color3: "transparent", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"
    },
    {
        id: 45, img: "../../images/image 1.jpg", productName: "Syltherine", productIntroduction: "Stylish cafe chair",
        DiscountPrice: 2500000, price: 3500000, discountPercent: 30, newProduct: false, discount: true
        , poster: true, type: "chair", imgSecoundMain: "../../images/product img CHALET chair.webp", imgSecound1: "../../images/Stylish cafe chair secound1.webp", imgSecound2: "../../images/product img CARROT chair.webp", imgSecound3: "../../images/product img AFRICA chair.webp", imgSecound4: "../../images/product img black chair.webp", description: "The Ottis restaurant table is one way restaurants can foster a more social experience for guests. It is the most cost effective way to increase seating capacity, generate more revenue and deliver on your guests's appetite for varied seating choices. Its clean look and robust built makes it perfect for industrial style decors as well as communal dining"
        , color1: "CHALET", color2: "CARROT", color3: "AFRICA", color4: "black"
        , count: 1, colorActive: "CHALET", sizeActive: "L"
    },
    {
        id: 46, img: "../../images/image 2.jpg", productName: "Leviosa", productIntroduction: "Stylish cafe chair",
        DiscountPrice: null, price: 2500000, discountPercent: 0, newProduct: false, discount: false
        , poster: false, type: "chair", imgSecoundMain: "../../images/product img gray chair.webp", imgSecound1: "../../images/product img brown chair.webp", imgSecound2: "../../images/chair -2.webp", imgSecound3: "../../images/product img LINEN chair.webp", imgSecound4: "../../images/chair -4.webp"
        , description: "The Invicta metal lounge arm chair accurately stands for cosmopolitan dining. Incorporating a luxurious lounge seating with a touch of glamour into your restaurant design is a way to deliver the VIP experience to your guests.A perfect mix of modern and chic, this padded metal chair is a great way to dress up your restaurant or cafe dining room. Upholstered in vinyl with two choices of colors, this chair utilizes high density foam padding for exceptional comfort. With a cut-out half circle back design and sleak metal legs, this accent arm chair adds a cozy space to any room."
        , color1: "gray", color2: "brown", color3: "LINEN", color4: "transparent"
        , count: 1, colorActive: "gray", sizeActive: "L"
    },
    {
        id: 47, img: "../../images/image 3.jpg", productName: "Lolito", productIntroduction: "Luxury big sofa",
        DiscountPrice: 7000000, price: 14000000, discountPercent: 50, newProduct: false, discount: true
        , poster: true, type: "sofa", imgSecoundMain: "../../images/product img STEAM sofa.webp", imgSecound1: "../../images/product img CHALET sofa.webp", imgSecound2: "../../images/product img gray sofa.webp", imgSecound3: "../../images/sofa  lolito main.webp 3.webp"
        , imgSecound4: "../../images/sofa  lolito main.webp 4.webp", description: "An angular display of modern comfort, the Jack Outdoor Sofa is a sophisticated piece that sets the tone for your outdoor design. Arranged around your outdoor table, you'll be moving all your summer meals outside.This item does not qualify for sales events and is unavailable for additional discounting or promotions", color1: "STEAM", color2: "CHALET", color3: "gray", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"
    },

    {
        id: 48, img: "../../images/image 4.jpg", productName: "Respira", productIntroduction: "Outdoor bar table and stool",
        DiscountPrice: null, price: 500000, discountPercent: 0, newProduct: true, discount: false
        , poster: true, type: "table", imgSecoundMain: "../../images/product img STEAM table.webp", imgSecound1: "../../images/table Respira main 1.webp", imgSecound2: "../../images/product img LINEN table.webp", imgSecound3: "../../images/table Respira main 3.webp", imgSecound4: "../../images/product img black table.webp", description: "Faux Teak and Aluminum will never rust and it will never rot, making these materials ideal for an outdoor restaurant table. This table is a great way to impart your restaurant patio or outdoor cafe with somber, architectural elegance. We have many sizes available, including most of the popular patio sizes. Pair with our matching bar stool, armchair, and side chair to complete your patio set.", color1: "STEAM", color2: "LINEN", color3: "black", color4: "transparent"
        , count: 1, colorActive: "STEAM", sizeActive: "L"
    },

]
let images = [
    { id: 1, introduction: "Second bedroom", Title: "pleasant", img: "images/Rectangle 24.jpg" },
    { id: 2, introduction: "bed Room", Title: "Inner Peace", img: "images/Rectangle 25.jpg" },
    { id: 3, introduction: "work room", Title: "cute", img: "images/Rectangle 26.jpg" },
    { id: 4, introduction: "kitchen", Title: "centralized", img: "images/Rectangle 25.jpg" },
]



export { products, images }