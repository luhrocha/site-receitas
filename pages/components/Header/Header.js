import  Head from "next/head";
import Link from "next/link";
import HeaderStyled from "./Header.styled";

export default function Header(props){
    return (
        <header className="header">  
        <style jsx>{HeaderStyled}</style>          
            <Head>
                <title>{props.title}</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </Head>
            <Link href="/">
                <a>
                    <img alt="Logo Na Cozinha" src="/img/logo.svg"/>
                </a>
            </Link>
        </header>
    );
};