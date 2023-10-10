import Link from "next/Link";

//

const Buttonh = () => {
    return (
        <div className="max-w-xl mx-auto">
            <div class="main">
                <div class="up">

                    <button class="card1">
                        <Link href="/">
                            # HOME
                        </Link>
                    </button>
                    <button class="card2">
                        <Link href="/">
                            # POSTS
                        </Link>
                    </button>
                </div>

                <div class="down">
                    <button class="card3">
                        <Link href="/">
                            # VALIDATE
                        </Link>
                    </button>
                    <button class="card4">
                        <Link href="/">
                            # LOGIN
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Buttonh;
