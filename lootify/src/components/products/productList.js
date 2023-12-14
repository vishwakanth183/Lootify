"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../../../src/shared/commonStyles.scss";
import './productList.scss'
import { Typography, TextField, InputAdornment, Card, Slider, Checkbox, Button, Divider, CardMedia } from "@mui/material";
import { Search, HighlightOffOutlined, Star } from '@mui/icons-material'

const ProductList = () => {

    const [brandList, setBrandList] = useState(['adidas', 'allen solly', 'balckberrys', 'flying machine', 'puma', 'nike'])
    const [size, setSize] = useState(['S', 'M', 'L', 'XL', 'XXL'])
    const [id, setId] = useState(false)
    const [productlistData, setPeoductListdata] = useState([
        {
            id: 1,
            name: 'Red shirt',
            price: 299,
            costcompare: 399,
            offer: 20,
            rating: 4.1,
            image: 'https://th.bing.com/th/id/OIP.--Bhv05grQ8eBnssITOZqgHaIt?pid=ImgDet&rs=1'
        },
        {
            id: 2,
            name: 'casual shirt',
            price: 299,
            costcompare: 399,
            offer: 20,
            rating: 4.1,
            image: 'https://media.istockphoto.com/id/488160041/photo/mens-shirt.jpg?s=612x612&w=0&k=20&c=xVZjKAUJecIpYc_fKRz_EB8HuRmXCOOPOtZ-ST6eFvQ='
        },
        {
            id: 3,
            name: 'Red shirt',
            price: 299,
            costcompare: 399,
            offer: 20,
            rating: 4.1,
            image: 'https://rukminim1.flixcart.com/image/832/832/xif0q/shirt/p/j/o/s-fo-shrt-499-nav-5th-anfold-original-imafxamjsk2p7ymc-bb.jpeg?q=70'
        },
        {
            id: 4,
            name: 'Red shirt',
            price: 299,
            costcompare: 399,
            offer: 20,
            rating: 4.1,
            image: 'https://d1b5h9psu9yexj.cloudfront.net/49275/J-Crew-Broken-In-Organic-Cotton-Oxford-Shirt_20220126-162201_full.jpg'
        },
        {
            id: 5,
            name: 'Red shirt',
            price: 299,
            costcompare: 399,
            offer: 20,
            rating: 4.1,
            image: 'https://media.istockphoto.com/id/488160041/photo/mens-shirt.jpg?s=612x612&w=0&k=20&c=xVZjKAUJecIpYc_fKRz_EB8HuRmXCOOPOtZ-ST6eFvQ='
        },
        {
            id: 6,
            name: 'Red shirt',
            price: 299,
            costcompare: 399,
            offer: 20,
            rating: 4.1,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCtYKhuDXR922y0jgl_UMZn84v6e8s9eHeUw&usqp=CAU'
        },
        {
            id: 7,
            name: 'Red shirt',
            price: 299,
            costcompare: 399,
            offer: 20,
            rating: 4.1,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtFdw0gtNcbKNonA9w9XR73ulWcAYzazuwXw&usqp=CAU'
        },
        {
            id: 8,
            name: 'Red shirt',
            price: 299,
            costcompare: 399,
            offer: 20,
            rating: 4.1,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtFdw0gtNcbKNonA9w9XR73ulWcAYzazuwXw&usqp=CAU'
        },
        {
            id: 9,
            name: 'Red shirt',
            price: 299,
            costcompare: 399,
            offer: 20,
            rating: 4.1,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_dUa0Gsx87yl45G4Ppf8D6UklFiQoz2cdcA&usqp=CAU'
        },
        {
            id: 10,
            name: 'Red shirt',
            price: 299,
            costcompare: 399,
            offer: 20,
            rating: 4.1,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS58qvHTkJuxaKpvPlnDrLtlwsqTaZeOjCIFg&usqp=CAU'
        }


    ])

    const handleMouseOver = (id) => {
        console.log('hhhhhhhhhhhhh', id)
        setId(id)
    };

    const handleMouseOut = () => {
        setId(null)
    };
    return (
        <div className='maincontainer'>
            <div className="searchview">
                <TextField
                    className="inputfield"
                    name="serch"
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                        endAdornment: <InputAdornment><HighlightOffOutlined /></InputAdornment>,
                        className: 'inputprops'
                    }}
                />
            </div>
            <div className="mainview">
                <div className="filterview">

                    <Card className="cardView" elevation={3}>
                        <div className="divListTop">
                            <Typography className="headingText">Fliter</Typography>
                            <Button variant="outlined" className="resetStyle">Reset</Button>
                        </div>
                        <Divider className="dividerStyle" />
                        <div className="divList">
                            <Typography className="headingText">Price</Typography>
                            <Slider className="sliderView"
                                max={5000}
                                min={500}
                                step={500}
                                valueLabelDisplay="auto"

                            />
                        </div>
                        <div className="divList">
                            <Typography className="headingText">Brand</Typography>
                            <div>
                                {brandList.map((item, index) => (
                                    <div className="checkBoxView" key={index}>
                                        <Checkbox size="small" />
                                        <Typography className="checkText">{item}</Typography>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="divList">
                            <Typography className="headingText">Size</Typography>
                            <div>
                                {size.map((item, index) => (
                                    <div className="checkBoxView" key={index}>
                                        <Checkbox size="small" />
                                        <Typography className="checkText">{item}</Typography>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="listview">
                    {productlistData.map((item, index) => (
                        <Card className="listCard" onMouseLeave={handleMouseOut} onMouseEnter={() => handleMouseOver(item.id)} key={index} elevation={id == item.id ? 20 : 3} >
                            <CardMedia
                                component='img'
                                className="image"
                                src={item?.image}
                            />

                            <div className="productNameView">
                                <Typography className="productName">Yellow plain shirt</Typography>
                                <div className="reviewView">
                                    <Star className="star" />
                                    <Typography className="review">4.8</Typography>
                                </div>
                            </div>
                            <div>
                                <Typography className="productBrand">Allen solly</Typography>
                            </div>
                            <div className="productPriceView">
                                <Typography className="comparePriceText">$99.00</Typography>
                                <Typography className="offerText">5%</Typography>
                                <Typography className="priceText">$89.00</Typography>
                            </div>
                        </Card>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default ProductList;