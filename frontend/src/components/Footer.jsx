import {IoChevronDownSharp} from "react-icons/io5";

const Footer = () => {
    const links = [{name: "회사소개"}, {name: "이용약관"}, {name: "개인정보처리방침"}, {name: "이용안내"},];

    return (<div className="footer-container">
            <div className="footer-top">
                <a className="text-3xl font-serif cursor-pointer">Homezy</a>
                <div className="space-x-9 flex">
                    {links.map((link, index) => (<a
                            key={index}
                            className="footer-linktext"
                            onClick={(event) => {
                                event.preventDefault(); // 기본 동작 방지
                                if (link.onclick) link.onclick(); // onclick 함수 호출
                            }}
                        >
                            {link.name}
                        </a>))}
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-lefttext">
                    <a className="footer-text mt-[20px]">쇼핑몰 기본정보</a>
                    <div className="footer-group1 mt-[10px]">
                        <a className="footer-subtext">상호명 <span className="footer-subtext2">OOO</span></a>
                        <a className="footer-subtext">대표자명 <span className="footer-subtext2">OOO</span></a>
                        <a className="footer-subtext">사업장 주소 <span
                            className="footer-subtext2">07071 서울특별시 동작구 보라매로5길 15</span></a>
                    </div>
                    <div className="footer-group2">
                        <a className="footer-subtext">대표 전화 <span className="footer-subtext2">1577-1577</span></a>
                        <a className="footer-subtext">사업자 등록번호 <span className="footer-subtext2">123-45-67890</span></a>
                        <a className="footer-subtext">통신판매업 신고번호 <span className="footer-subtext2">기타</span></a>
                    </div>
                    <div className="footer-group2">
                        <a className="footer-subtext">개인정보보호책임자 <span className="footer-subtext2">OOO</span></a>
                    </div>
                    <a className="footer-subtext3 mt-[150px]">Copyright © 홈즈. All Rights Reserved. Hosting by Cafe24
                        Corp.</a>
                </div>
                <div className="footer-righttext">
                    <div className="flex flex-col w-[180px] h-[231px] items-start">
                        <a className="footer-text2">고객센터 정보</a>
                        <div className="flex flex-row w-[160px]">
                            <a className="footer-subtext mt-[13px]">상담/주문전화<span
                                className="footer-subtext3 ml-[8px]">1234-1234</span></a>
                        </div>
                        <a className="footer-subtext mt-[13px]">상담/주문 이메일</a>
                        <a className="footer-subtext3 mt-[3px]">test@test.com</a>
                        <a className="footer-subtext mt-[13px]">CS운영시간</a>
                        <a className="footer-subtext3 mt-[3px]">Daily : 10:00 - 18:00</a>
                        <a className="footer-subtext3 mt-[3px]">Lunch : 12:00 - 13:00</a>
                        <a className="footer-subtext3 mt-[3px]">Sat & Sun & Holiday : Day Off</a>
                    </div>
                    <div className="flex flex-col w-[175px] h-[231px] md:ml-[24px] xl:ml-[54px] items-start">
                        <a className="footer-text2">결제 정보</a>
                        <a className="footer-subtext mt-[13px]">무통장 계좌정보</a>
                        <a className="footer-subtext3 mt-[3px]">카카오뱅크 1234-123-56789</a>
                    </div>
                    <div className="flex flex-col w-[90px] h-[231px] md:ml-[54px] xl:ml-[82px] items-start">
                        <a className="footer-text2">SNS</a>
                        <a className="footer-subtext3 mt-[13px]">instagram</a>
                        <a className="footer-subtext3 mt-[5px]">youtube</a>
                        <a className="footer-subtext3 mt-[5px]">facebook</a>
                        <a className="footer-subtext3 mt-[5px]">kakao</a>
                        <a className="footer-subtext3 mt-[5px]">twitter</a>
                        <a className="footer-subtext3 mt-[5px]">blog</a>
                    </div>
                </div>
            </div>
        </div>)
}

export default Footer;