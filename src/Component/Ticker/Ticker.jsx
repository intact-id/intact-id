import "./Ticker.css";
import Marquee from "react-fast-marquee";

const Ticker = () => {
    const events = [
        { icon: "✅", text: "Identity Verified in London, UK", time: "2s ago" },
        { icon: "⚡", text: "Document Scanned in New York, USA", time: "5s ago" },
        { icon: "🛡️", text: "Fraud Attempt Blocked in Singapore", time: "12s ago" },
        { icon: "👤", text: "New User Onboarded in Berlin, DE", time: "15s ago" },
        { icon: "✅", text: "Passport Verified in Toronto, CA", time: "18s ago" },
        { icon: "⚡", text: "Face Match Confirmed in Tokyo, JP", time: "22s ago" },
        { icon: "🛡️", text: "Suspicious IP Flagged in Sydney, AU", time: "25s ago" },
    ];

    return (
        <div className="ticker-wrapper">
            <div className="ticker-label">
                <span className="live-dot"></span>
                LIVE
            </div>
            <Marquee gradient={false} speed={40} className="ticker-content">
                {events.map((event, index) => (
                    <div key={index} className="ticker-item">
                        <span className="ticker-icon">{event.icon}</span>
                        <span className="ticker-text">{event.text}</span>
                        <span className="ticker-time">{event.time}</span>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default Ticker;
