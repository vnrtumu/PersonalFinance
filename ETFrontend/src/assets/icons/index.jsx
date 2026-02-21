import React from 'react';

// Import all SVG files
import HomeSvg from './svgs/home.svg';
import ListSvg from './svgs/list.svg';
import PlusSvg from './svgs/plus.svg';
import UsersSvg from './svgs/users.svg';
import UserSvg from './svgs/user.svg';
import BellSvg from './svgs/bell.svg';
import WalletSvg from './svgs/wallet.svg';
import TrendingUpSvg from './svgs/trending-up.svg';
import TrendingDownSvg from './svgs/trending-down.svg';
import ClockSvg from './svgs/clock.svg';
import XSvg from './svgs/x.svg';
import CheckSvg from './svgs/check.svg';
import ChevronRightSvg from './svgs/chevron-right.svg';
import ChevronLeftSvg from './svgs/chevron-left.svg';
import ChevronDownSvg from './svgs/chevron-down.svg';
import ArrowUpRightSvg from './svgs/arrow-up-right.svg';
import ArrowDownLeftSvg from './svgs/arrow-down-left.svg';
import CreditCardSvg from './svgs/credit-card.svg';
import BanknoteSvg from './svgs/banknote.svg';
import ShieldSvg from './svgs/shield.svg';
import CircleHelpSvg from './svgs/circle-help.svg';
import LogOutSvg from './svgs/log-out.svg';
import TagSvg from './svgs/tag.svg';
import TrashSvg from './svgs/trash.svg';
import SmartphoneSvg from './svgs/smartphone.svg';
import FileTextSvg from './svgs/file-text.svg';
import FuelSvg from './svgs/fuel.svg';
import GraduationCapSvg from './svgs/graduation-cap.svg';
import HeartPulseSvg from './svgs/heart-pulse.svg';
import ShoppingCartSvg from './svgs/shopping-cart.svg';
import UtensilsSvg from './svgs/utensils.svg';
import PlaneSvg from './svgs/plane.svg';
import ShirtSvg from './svgs/shirt.svg';
import GiftSvg from './svgs/gift.svg';
import BriefcaseSvg from './svgs/briefcase.svg';
import MonitorSvg from './svgs/monitor.svg';
import ShieldCheckSvg from './svgs/shield-check.svg';
import CameraSvg from './svgs/camera.svg';
import ImageSvg from './svgs/image.svg';
import PencilSvg from './svgs/pencil.svg';
import EyeSvg from './svgs/eye.svg';
import EyeOffSvg from './svgs/eye-off.svg';
import SearchSvg from './svgs/search.svg';
import PinSvg from './svgs/pin.svg';


/**
 * Wrapper to ensure icons handle 'size' and 'color' props correctly.
 */
const createIcon = (Component) => {
    const Icon = ({ size = 24, color = 'currentColor', ...props }) => {
        return (
            <Component width={size} height={size} color={color} {...props} />
        );
    };
    return Icon;
};

export const HomeIcon = createIcon(HomeSvg);
export const ListIcon = createIcon(ListSvg);
export const PlusIcon = createIcon(PlusSvg);
export const UsersIcon = createIcon(UsersSvg);
export const UserIcon = createIcon(UserSvg);
export const BellIcon = createIcon(BellSvg);
export const WalletIcon = createIcon(WalletSvg);
export const TrendingUpIcon = createIcon(TrendingUpSvg);
export const TrendingDownIcon = createIcon(TrendingDownSvg);
export const ClockIcon = createIcon(ClockSvg);
export const XIcon = createIcon(XSvg);
export const CheckIcon = createIcon(CheckSvg);
export const ChevronRightIcon = createIcon(ChevronRightSvg);
export const ChevronLeftIcon = createIcon(ChevronLeftSvg);
export const ChevronDownIcon = createIcon(ChevronDownSvg);
export const ArrowUpRightIcon = createIcon(ArrowUpRightSvg);
export const ArrowDownLeftIcon = createIcon(ArrowDownLeftSvg);
export const CreditCardIcon = createIcon(CreditCardSvg);
export const BanknoteIcon = createIcon(BanknoteSvg);
export const ShieldIcon = createIcon(ShieldSvg);
export const CircleHelpIcon = createIcon(CircleHelpSvg);
export const LogOutIcon = createIcon(LogOutSvg);
export const TagIcon = createIcon(TagSvg);
export const TrashIcon = createIcon(TrashSvg);
export const SmartphoneIcon = createIcon(SmartphoneSvg);
export const FileTextIcon = createIcon(FileTextSvg);
export const FuelIcon = createIcon(FuelSvg);
export const GraduationCapIcon = createIcon(GraduationCapSvg);
export const HeartPulseIcon = createIcon(HeartPulseSvg);
export const ShoppingCartIcon = createIcon(ShoppingCartSvg);
export const UtensilsIcon = createIcon(UtensilsSvg);
export const PlaneIcon = createIcon(PlaneSvg);
export const ShirtIcon = createIcon(ShirtSvg);
export const GiftIcon = createIcon(GiftSvg);
export const BriefcaseIcon = createIcon(BriefcaseSvg);
export const MonitorIcon = createIcon(MonitorSvg);
export const ShieldCheckIcon = createIcon(ShieldCheckSvg);
export const CameraIcon = createIcon(CameraSvg);
export const ImageIcon = createIcon(ImageSvg);
export const PencilIcon = createIcon(PencilSvg);
export const EyeIcon = createIcon(EyeSvg);
export const EyeOffIcon = createIcon(EyeOffSvg);
export const SearchIcon = createIcon(SearchSvg);
export const PinIcon = createIcon(PinSvg);


export const IconMap = {
    tag: TagIcon,
    wallet: WalletIcon,
    home: HomeIcon,
    smartphone: SmartphoneIcon,
    'file-text': FileTextIcon,
    bell: BellIcon,
    shield: ShieldIcon,
    users: UsersIcon,
    user: UserIcon,
    'credit-card': CreditCardIcon,
    banknote: BanknoteIcon,
    clock: ClockIcon,
    'trending-up': TrendingUpIcon,
    'trending-down': TrendingDownIcon,
    trash: TrashIcon,
    fuel: FuelIcon,
    'graduation-cap': GraduationCapIcon,
    'heart-pulse': HeartPulseIcon,
    'shopping-cart': ShoppingCartIcon,
    utensils: UtensilsIcon,
    plane: PlaneIcon,
    shirt: ShirtIcon,
    gift: GiftIcon,
    briefcase: BriefcaseIcon,
    monitor: MonitorIcon,
    'shield-check': ShieldCheckIcon,
    camera: CameraIcon,
    image: ImageIcon,
    pencil: PencilIcon,
    eye: EyeIcon,
    'eye-off': EyeOffIcon,
    search: SearchIcon,
    pin: PinIcon,
    'chevron-down': ChevronDownIcon,
};
