import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Box } from '@mui/material';
import { styled } from '@mui/system';

const items = [
    {
        name: "Banner 1",
        description: "Nike Mecurial Superfly 10 Ellite",
        image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/190f32e9-691a-4ae3-a4ea-555353c3e5dd/mercurial-vapor-16-elite-blueprint-fg-low-top-football-boot-STcMzc.png"
    },
    {
        name: "Banner 2",
        description: "This is the second banner",
        image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f02453d3-7589-4c91-b86c-6f2262153eac/mercurial-superfly-10-elite-blueprint-fg-high-top-football-boot-bw1xLJ.png"
    },
    {
        name: "Banner 3",
        description: "This is the third banner",
        image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/63f9f004-cfe8-4beb-95d8-7c2d3bc167d5/alphafly-3-blueprint-road-racing-shoes-n5fmNS.png"
    }
];

const BannerImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'fill', // Đảm bảo ảnh được hiển thị đầy đủ mà không bị cắt
});

const BannerContainer = styled(Box)({
    marginBottom: '10px',
    width: '100%',
    height: '100%', // Chiều cao cố định cho container

});

function BannerItem(props: { item: { image: string; name: string; description: string; }; }) {
    return (
        <Paper style={{ height: '600px' }}>
            <BannerImage src={props.item.image} alt={props.item.name} />
        </Paper>
    );
}

const BannerSlideshow = () => {
    return (
        <BannerContainer>
            <Carousel>
                {items.map((item, i) => (
                    <BannerItem key={i} item={item} />
                ))}
            </Carousel>
        </BannerContainer>
    );
};

export default BannerSlideshow;
