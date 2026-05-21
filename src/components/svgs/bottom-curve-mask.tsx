type BottomCurveProps = {
    className?: string;
};

export default function BottomCurve({
    className = "",
}: BottomCurveProps) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 100 50"
            preserveAspectRatio="none"
            className={className}
        >
            <path
                d="
            M 0 50
            A 50 50 0 0 1 100 50
            L 0 50
            Z
          "
                className="fill-transparent"
            />
        </svg>
    );
}