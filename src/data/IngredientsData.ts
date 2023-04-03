const ingredientsData = [
    {
        Id:1,
        Name:"Brandy",
        AliasId:0,
        Color: "--brandy",
        Type: "Spirit"
    },
    {
        Id:2,
        Name:"Gin",
        AliasId:0,
        Color: "--gin",
        Type: "Spirit"
    },
    {
        Id:3,
        Name:"Rum",
        AliasId:0,
        Color: "--rum",
        Type: "Spirit"
    },
    {
        "Id":4,
        "Name":"Tequila",
        "AliasId":0,
        Color: "--tequila",
        Type: "Spirit"
    },
    {
        "Id":5,
        "Name":"Vodka",
        "AliasId":0,
        Color: "--clear",
        Type: "Spirit"
    },
    {
        "Id":6,
        "Name":"Whiskey",
        "AliasId":0,
        Color: "--whiskey",
        Type: "Spirit"
    },
    {
        "Id":7,
        "Name":"Almond Liqueur",
        "AliasId":0,
        Color: "--almond",
        Type: "Liqueur"
    },
    {
        "Id":8,
        "Name":"Cherry Liqueur",
        "AliasId":0,
        Color: "--cherry",
        Type: "Liqueur"
    },
    {
        "Id":9,
        "Name":"Chocolate Liqueur",
        "AliasId":0,
        Color: "--chocolate",
        Type: "Liqueur"
    },
    {
        "Id":10,
        "Name":"Coffee Liqueur",
        "AliasId":0,
        Color: "--coffee",
        Type: "Liqueur"
    },
    {
        "Id":11,
        "Name":"Coconut Liqueur",
        "AliasId":0,
        Color: "--coconut",
        Type: "Liqueur"
    },
    {
        "Id":12,
        "Name":"Irish Cream",
        "AliasId":0,
        Color: "--irish",
        Type: "Liqueur"
    },
    {
        "Id":13,
        "Name":"Herbal Liqueur",
        "AliasId":0,
        Color: "--herbal",
        Type: "Liqueur"
    },
    {
        "Id":14,
        "Name":"Mint Liqueur",
        "AliasId":0,
        Color: "--mint",
        Type: "Liqueur"
    },
    {
        "Id":15,
        "Name":"Melon Liqueur",
        "AliasId":0,
        Color: "--melon",
        Type: "Liqueur"
    },
    {
        "Id":16,
        "Name":"Orange Liqueur",
        "AliasId":0,
        Color: "--orange",
        Type: "Liqueur"
    },
    {
        "Id":17,
        "Name":"Peach Liqueur",
        "AliasId":0,
        Color: "--peach",
        Type: "Liqueur"
    },
    {
        "Id":18,
        "Name":"Raspberry Liqueur",
        "AliasId":0,
        Color: "--raspberry",
        Type: "Liqueur"
    },
    {
        "Id":19,
        "Name":"Sloe Berry Liqueur",
        "AliasId":0,
        Color: "--sloe",
        Type: "Liqueur"
    },
    {
        "Id":20,
        "Name":"Southern Comfort",
        "AliasId":0,
        Color: "--whiskey",
        Type: "Liqueur"
    },
    {
        "Id":21,
        "Name":"Bitters",
        "AliasId":0,
        Color: "--orange",
        Type: "Other Alcohol"
    },
    {
        "Id":22,
        "Name":"Champagne",
        "AliasId":0,
        Color: "--champagne",
        Type: "Other Alcohol"
    },
    {
        "Id":23,
        "Name":"Dry Vermouth",
        "AliasId":0,
        Color: "--drymouth",
        Type: "Other Alcohol"
    },
    {
        "Id":24,
        "Name":"Sweet Vermouth",
        "AliasId":0,
        Color: "--sweetmouth",
        Type: "Other Alcohol"
    },
    {
        "Id":25,
        "Name":"Cola",
        "AliasId":0,
        Color: "--cola",
        Type: "Carbonated"
    },
    {
        "Id":26,
        "Name":"Ginger Ale",
        "AliasId":0,
        Color: "--ginger",
        Type: "Carbonated"
    },
    {
        "Id":27,
        "Name":"Ginger Beer",
        "AliasId":0,
        Color: "--ginger",
        Type: "Carbonated"
    },
    {
        "Id":28,
        "Name":"Lemon-Lime Soda",
        "AliasId":0,
        Color: "--lemlime",
        Type: "Carbonated"
    },
    {
        "Id":29,
        "Name":"Soda Water",
        "AliasId":0,
        Color: "--clear",
        Type: "Carbonated"
    },
    {
        "Id":30,
        "Name":"Tonic Water",
        "AliasId":0,
        Color: "--clear",
        Type: "Carbonated"
    },
    {
        "Id":31,
        "Name":"Cranberry Juice",
        "AliasId":0,
        Color: "--cranberry",
        Type: "Juice"
    },
    {
        "Id":32,
        "Name":"Grapefruit Juice",
        "AliasId":0,
        Color: "--grapefruit",
        Type: "Juice"
    },
    {
        "Id":33,
        "Name":"Lemon Juice",
        "AliasId":0,
        Color: "--lemon",
        Type: "Juice"
    },
    {
        "Id":34,
        "Name":"Lime Juice",
        "AliasId":0,
        Color: "--lime",
        Type: "Juice"
    },
    {
        "Id":35,
        "Name":"Orange Juice",
        "AliasId":0,
        Color: "--orange",
        Type: "Juice"
    },
    {
        "Id":36,
        "Name":"Pineapple Juice",
        "AliasId":0,
        Color: "--pineapple",
        Type: "Juice"
    },
    {
        "Id":37,
        "Name":"Cream",
        "AliasId":0,
        Color: "--cream",
        Type: "Other Mixer"
    },
    {
        "Id":38,
        "Name":"Cream of Coconut",
        "AliasId":0,
        Color: "--coconut",
        Type: "Other Mixer"
    },
    {
        "Id":39,
        "Name":"Grenadine",
        "AliasId":0,
        Color: "--grenadine",
        Type: "Other Mixer"
    },
    {
        "Id":40,
        "Name":"Mint Sprig",
        "AliasId":0,
        Color: "--mint",
        Type: "Other Mixer"
    },
    {
        "Id":41,
        "Name":"Simple Syrup",
        "AliasId":0,
        Color: "--clear",
        Type: "Other Mixer"
    },
    {
        "Id":43,
        "Name":"Blue Curacao",
        "AliasId":16,
        Color: null,
        Type: null
    },
    {
        "Id":44,
        "Name":"Cointreau",
        "AliasId":16,
        Color: null,
        Type: null
    },
    {
        "Id":45,
        "Name":"Chambord",
        "AliasId":18,
        Color: null,
        Type: null
    },
    {
        "Id":46,
        "Name":"Egg White",
        "AliasId":0,
        Color: "--vanilla",
        Type: "Other Mixer"
    },
    {
        "Id":47,
        "Name":"Amaretto",
        "AliasId":7,
        Color: null,
        Type: null
    },
    {
        "Id":48,
        "Name":"Cherry Brandy",
        "AliasId":8,
        Color: null,
        Type: null
    },
    {
        "Id":49,
        "Name":"Grand Marnier",
        "AliasId":16,
        Color: null,
        Type: null
    },
    {
        "Id":50,
        "Name":
        "Benedictine",
        "AliasId":13,
        Color: null,
        Type: null
    },
    {
        "Id":51,
        "Name":"Bourbon",
        "AliasId":6,
        Color: null,
        Type: null
    },
    {
        "Id":52,
        "Name":"White Rum",
        "AliasId":3,
        Color: null,
        Type: null
    },
    {
        "Id":53,
        "Name":"Dark Rum",
        "AliasId":3,
        Color: null,
        Type: null
    },
    {
        "Id":54,
        "Name":"Dark Creme De Cacao",
        "AliasId":9,
        Color: null,
        Type: null
    },
    {
        "Id":55,
        "Name":"Heavy Cream",
        "AliasId":37,
        Color: null,
        Type: null
    },
    {
        "Id":56,
        "Name":"Whipped Cream Vodka",
        "AliasId":5,
        Color: null,
        Type: null
    },
    {
        "Id":57,
        "Name":"Cognac",
        "AliasId":1,
        Color: null,
        Type: null
    },
    {
        "Id":58,
        "Name":"Orange Curacao",
        "AliasId":16,
        Color: null,
        Type: null
    },
    {
        "Id":59,
        "Name":"Maraschino",
        "AliasId":8,
        Color: null,
        Type: null
    },
    {
        "Id":60,
        "Name":"Angostura",
        "AliasId":21,
        Color: null,
        Type: null
    },
    {
        "Id":61,
        "Name":"Blended",
        "AliasId":6,
        Color: null,
        Type: null
    },
    {
        "Id":62,
        "Name":"Aged",
        "AliasId":3,
        Color: null,
        Type: null
    },
    {
        "Id":63,
        "Name":"Triple Sec",
        "AliasId":16,
        Color: null,
        Type: null
    },
    {
        "Id":64,
        "Name":"London Dry",
        "AliasId":2,
        Color: null,
        Type: null
    },
    {
        "Id":65,
        "Name":"Midori",
        "AliasId":15,
        Color: null,
        Type: null
    },
    {
        "Id":66,
        "Name":"Silver",
        "AliasId":4,
        Color: null,
        Type: null
    },
    {
        "Id":67,
        "Name":"Reposado",
        "AliasId":4,
        Color: null,
        Type: null
    },
    {
        "Id":68,
        "Name":"Apple Flavored Bourbon",
        "AliasId":6,
        Color: null,
        Type: null
    },
    {
        "Id":69,
        "Name":"Orange",
        "AliasId":21,
        Color: null,
        Type: null
    },
    {
        "Id":70,
        "Name":"Vanilla Extract",
        "AliasId":0,
        Color: "--vanilla",
        Type: "Other Mixer"
    },
    {
        "Id":71,
        "Name":"Water",
        "AliasId":0,
        Color: "--clear",
        Type: "Other Mixer"
    },
    {
        "Id":72,
        "Name":"Half \u0026 Half",
        "AliasId":37,
        Color: null,
        Type: null
    },
    {
        "Id":73,
        "Name":"Kahlua",
        "AliasId":10,
        Color: null,
        Type: null
    },
    {
        "Id":74,
        "Name":"Spiced Rum",
        "AliasId":3,
        Color: null,
        Type: null
    },
    {
        "Id":75,
        "Name":"White Creme De Menthe",
        "AliasId":14,
        Color: null,
        Type: null
    },
    {
        "Id":76,
        "Name":"Blanco",
        "AliasId":4,
        Color: null,
        Type: null
    },
    {
        "Id":77,
        "Name":"Galliano",
        "AliasId":13,
        Color: null,
        Type: null
    },
    {
        "Id":78,
        "Name":"Almond/Orgeat Syrup",
        "AliasId":0,
        Color: "--clear",
        Type: "Other Mixer"
    },
    {
        "Id":79,
        "Name":"Navy Rum",
        "AliasId":3,
        Color: null,
        Type: null
    },
    {
        "Id":80,
        "Name":"Rye Whiskey",
        "AliasId":6,
        Color: null,
        Type: null
    },
    {
        "Id":81,
        "Name":"Absinthe",
        "AliasId":0,
        Color: "--absinthe",
        Type: "Spirit"
    },
    {
        "Id":82,
        "Name":"Peychaud",
        "AliasId":21,
        Color: null,
        Type: null
    },
    {
        "Id":83,
        "Name":"White Creme De Cacao",
        "AliasId":9,
        Color: null,
        Type: null
    },
    {
        "Id":84,
        "Name":"Green Creme De Menthe",
        "AliasId":14,
        Color: null,
        Type: null
    },
    {
        "Id":85,
        "Name":"Scotch Whiskey",
        "AliasId":6,
        Color: null,
        Type: null
    },
    {
        "Id":86,
        "Name":"Irish Whiskey",
        "AliasId":6,
        Color: null,
        Type: null
    },
    {
        "Id":87,
        "Name":"Campari",
        "AliasId":21,
        Color: null,
        Type: null
    },
    {
        "Id":88,
        "Name":"Creme De Noyaux",
        "AliasId":7,
        Color: null,
        Type: null
    },
    {
        "Id":89,
        "Name":"Anejo Tequila",
        "AliasId":4,
        Color: null,
        Type: null
    },
    {
        "Id":90,
        "Name":"Vanilla Vodka",
        "AliasId":5,
        Color: null,
        Type: null
    }
]

ingredientsData.forEach(ingredient => {
    if (!ingredient["Color"]) {
        ingredientsData.forEach(item => {
            if (item["Id"] === ingredient["AliasId"]) {
                ingredient["Color"] = item["Color"]
            }
        })
    }

    if (!ingredient["Type"]) {
        ingredientsData.forEach(item => {
            if (item["Id"] === ingredient["AliasId"]) {
                ingredient["Type"] = item["Type"]
            }
        })
    }
})

export default ingredientsData