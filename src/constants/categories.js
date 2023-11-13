import images from '../assets/img';

const categories = {
    accessories: [
        {
            title: 'Nổi bật',
            path: '/',
        },
        {
            title: 'Phụ kiện Apple',
            path: '/',
        },
        {
            title: 'Dán màn hình',
            path: '/',
        },
        {
            title: 'Ốp lưng - Bao da',
            path: '/',
        },
        {
            title: 'Cáp, sạc',
            path: '/',
        },
        {
            title: 'Pin dự phòng',
            path: '/',
        },
        {
            title: 'Thiết bị mạng',
            path: '/',
        },
        {
            title: 'Gaming Gear',
            path: '/',
        },
        {
            title: 'Gimbal | Tay cầm chống rung',
            path: '/',
        },
        {
            title: 'Thẻ nhớ, USB',
            path: '/',
        },
        {
            title: 'Chuột, bàn phím',
            path: '/',
        },
        {
            title: 'Sim 4G',
            path: '/',
        },
        {
            title: 'Sim số đẹp',
            path: '/',
        },
        {
            title: 'Camera hành trình',
            path: '/',
        },
        {
            title: 'Camera an ninh',
            path: '/',
        },
        {
            title: 'Phụ kiện Laptop',
            path: '/',
        },
        {
            title: 'Balo, túi chống sốc',
            path: '/',
        },
        {
            title: 'Quạt mini',
            path: '/',
        },
        {
            title: 'Ổ cứng di động',
            path: '/',
        },
        {
            title: 'Apple Care',
            path: '/',
        },
    ],
    pcComponents: [
        {
            title: 'PC ráp sẵn CellphoneS',
            path: '/',
        },
        {
            title: 'CPU',
            path: '/',
        },
        {
            title: 'Mainboard',
            path: '/',
        },
        {
            title: 'RAM',
            path: '/',
        },
        {
            title: 'Ổ cứng',
            path: '/',
        },
        {
            title: 'Card màn hình',
            path: '/',
        },
        {
            title: 'Nguồn máy tính',
            path: '/',
        },
        {
            title: 'Tản nhiệt',
            path: '/',
        },
        {
            title: 'Case máy tính',
            path: '/',
        },
    ],
    secondHands: [
        {
            title: 'Điện thoại cũ',
            path: '/',
        },
        {
            title: 'Máy tính bảng cũ',
            path: '/',
        },
        {
            title: 'Mac cũ',
            path: '/',
        },
        {
            title: 'Laptop cũ',
            path: '/',
        },
        {
            title: 'Tai nghe cũ',
            path: '/',
        },
        {
            title: 'Loa cũ',
            path: '/',
        },
        {
            title: 'Đồng hồ thông minh cũ',
            path: '/',
        },
        {
            title: 'Nhà thông minh cũ',
            path: '/',
        },
        {
            title: 'Phụ kiện cũ',
            path: '/',
        },
        {
            title: 'Màn hình cũ',
            path: '/',
        },
        {
            title: 'Tivi cũ',
            path: '/',
        },
    ],
};

Object.keys(categories).map((key) => {
    return categories[key].map((item, index) => {
        return (item.image = images.categories[key][index]);
    });
});

export default categories;
