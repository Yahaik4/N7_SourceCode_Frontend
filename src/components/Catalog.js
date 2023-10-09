import clsx from 'clsx';
import { useEffect, useState } from 'react';

import styles from './Catalog.module.scss';
import CatalogChild from './CatalogChild';

// icons
import { IoPhonePortraitOutline, IoLaptopOutline, IoWatchOutline } from 'react-icons/io5';
import { TbDeviceAirpods, TbDeviceUsb } from 'react-icons/tb';
import { RiHomeGearFill } from 'react-icons/ri';
import { FaComputer } from 'react-icons/fa6';
import { SlScreenDesktop } from 'react-icons/sl';
import { GiCardExchange } from 'react-icons/gi';
import { BsPhoneFlip, BsNewspaper } from 'react-icons/bs';
import { AiOutlineNotification, AiOutlineRight } from 'react-icons/ai';

const catalogItems = [
    {
        text: 'Điện thoại, Tablet',
        icon: IoPhonePortraitOutline,
        data: [
            {
                title: 'Thương hiệu điện thoại',
                subTitles: [
                    'iPhone',
                    'Samsung',
                    'Xiaomi',
                    'OPPO',
                    'realme',
                    'vivo',
                    'Nokia',
                    'ASUS',
                    'Nubia',
                    'TECHNO',
                    'Infinix',
                    'OnePlus',
                    'Itel',
                    'TCL',
                    'Điện thoại phổ thông',
                ],
            },
            {
                title: 'Mức giá điện thoại',
                subTitles: [
                    'Dưới 2 triệu',
                    'Từ 2 - 4 triệu',
                    'Từ 4 - 7 triệu',
                    'Từ 7 - 13 triêu',
                    'Từ 13 - 20 triệu',
                    'Trên 20 triệu',
                ],
            },
            {
                title: 'Điện thoại hot',
                subTitles: [
                    'iphone 15',
                    'Galaxy ZFold 5',
                    'Galaxy ZFlip 5',
                    'Galaxy S23 Ultra',
                    'Xiaomi 13T Pro',
                    'realme C51',
                    'TCL 408',
                    'vivo Y17s',
                    'Nubia Neo',
                    'iPhone 15 Pro Max',
                ],
            },
            {
                title: 'Thương hiệu Tablet',
                subTitles: [
                    'iPad',
                    'Samsung',
                    'Xiaomi',
                    'Huawei',
                    'Lenovo',
                    'Nokia',
                    'TCL',
                    'Kindle',
                    'Máy đọc sách',
                    'Xem tất cả tablet',
                ],
            },
            {
                title: 'Tablet hot',
                subTitles: [
                    'iPad Air 5',
                    'iPad mini 6',
                    'Galaxy Tab S9 FE 5G',
                    'iPad Air 10.9" 2022 M1',
                    'Nokia T21',
                    'Huanwei MatePad SE 10.4',
                    'TCL Tab 10L 3GB 32GB',
                    'Xiaomi Pad SE',
                ],
            },
        ],
    },
    {
        text: 'Laptop',
        icon: IoLaptopOutline,
        data: [
            {
                title: 'Chọn theo hãng',
                subTitles: ['Mac', 'Asus', 'Lenovo', 'Dell', 'HP', 'Acer', 'LG', 'Huawei', 'MSI', 'Gigabyte', 'Vio', 'Microsoft Surface'],
            },
            {
                title: 'Chọn theo nhu cầu',
                subTitles: ['Văn phòng', 'Gaming', 'Mỏng nhẹ', 'Độ họa - Kỹ thuật', 'Sinh viên', 'Cảm ứng'],
            },
            {
                title: 'Chọn theo dòng chip',
                subTitles: ['Laptop Core i3','Laptop Core i5','Laptop Core i7', 'Laptop Core i9'],
            },
            {
                title: 'Chọn theo kích thước màn hình',
                subTitles: ['Laptop 12 inch', 'Laptop 13 inch', 'Laptop 14 inch', 'Laptop 15.6 inch', 'Laptop 16 inch'],
            },
            {
                title: 'Sản phẩm hot',
                subTitles: ['Macbook Pro M2 2022 512GB', 'Macbook Pro 13 M2 2022 256GB', 'Macbook Air M2 2022 512GB', 'MSI Modern 14 C7M-212VN', 'MSI Gaming GF64 Thin 664VN'],
            },
        ],
    },
    {
        text: 'Âm thanh',
        icon: TbDeviceAirpods,
        data: [
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
        ],
    },
    {
        text: 'Đồng hồ, Camera',
        icon: IoWatchOutline,
        data: [
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
        ],
    },
    {
        text: 'Gia dụng, Smarthome',
        icon: RiHomeGearFill,
        data: [
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
        ],
    },
    {
        text: 'Phụ kiện',
        icon: TbDeviceUsb,
        data: [
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
        ],
    },
    {
        text: 'PC, Màn hình',
        icon: FaComputer,
        data: [
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
        ],
    },
    {
        text: 'Tivi',
        icon: SlScreenDesktop,
        data: [
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
        ],
    },
    {
        text: 'Thu cũ đổi mới',
        icon: GiCardExchange,
        data: [
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
        ],
    },
    {
        text: 'Hàng cũ',
        icon: BsPhoneFlip,
        data: [
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
        ],
    },
    {
        text: 'Khuyến mãi',
        icon: AiOutlineNotification,
        data: [
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
        ],
    },
    {
        text: 'Tin công nghệ',
        icon: BsNewspaper,
        data: [
            {
                title: 'Chuyên mục',
                subTitles: ['Tin công nghệ', 'Khám phá', 'S-Games', 'Tư vấn', 'Trên tay', 'Thị trường', 'Thủ thuật'],
            },
        ],
    },
];

function Catalog() {
    const [showCatalogChild, setShowCatalogChild] = useState(false);
    const [catalogItemHover, setCatalogItemHover] = useState(0);
    const [dataCatalogChild, setDataCatalogChild] = useState([]);

    const handleShowCatalogChild = () => {
        setShowCatalogChild(true);
    };
    const handleUnshowCatalogChild = () => {
        setShowCatalogChild(false);
    };

    useEffect(() => {
        setDataCatalogChild(catalogItems[catalogItemHover].data);
    }, [catalogItemHover]);

    return (
        <>
            <div
                className={clsx(styles.wrapper)}
                onMouseEnter={handleShowCatalogChild}
                onMouseLeave={handleUnshowCatalogChild}
            >
                {catalogItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={index}
                            className={clsx(styles.catalogItem)}
                            onMouseEnter={() => setCatalogItemHover(index)}
                        >
                            <div className={clsx(styles.content)}>
                                <Icon className={clsx(styles.icon)} />
                                <strong>{item.text}</strong>
                            </div>
                            <AiOutlineRight />
                        </div>
                    );
                })}
            </div>
            {!showCatalogChild || (
                <div onMouseEnter={handleShowCatalogChild} onMouseLeave={handleUnshowCatalogChild}>
                    <CatalogChild content={dataCatalogChild} />
                </div>
            )}
        </>
    );
}

export default Catalog;
