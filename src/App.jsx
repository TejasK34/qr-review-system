import { useState } from "react";
import "./index.css";

const GOOGLE_REVIEW_URL =
  "https://www.google.com/maps/place/HOTEL+RAJDHANI+DELUXE/@16.8403328,74.3064188,17z/data=!4m8!3m7!1s0x3bc1070034e47be1:0xb7a5a137e67b3078!8m2!3d16.8403328!4d74.3089937!9m1!1b1!16s%2Fg%2F11z930r9d0?entry=ttu";

function App() {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [selectedFeedback, setSelectedFeedback] = useState([]);
  const [copied, setCopied] = useState(false);

  const feedbackOptions = {
    1: [
      "Food Quality",
      "Taste",
      "Service",
      "Staff Behaviour",
      "Waiting Time",
      "Cleanliness",
      "Price",
    ],

    2: [
      "Food Could Be Better",
      "Service Was Slow",
      "Staff Could Be More Helpful",
      "Long Waiting Time",
      "Cleanliness Could Improve",
      "Price Was High",
    ],

    3: [
      "Average Food",
      "Average Service",
      "Could Improve Taste",
      "Could Improve Ambience",
      "Reasonable Price",
      "Friendly Staff",
    ],

    4: [
      "Good Food",
      "Good Taste",
      "Good Service",
      "Friendly Staff",
      "Clean Place",
      "Nice Ambience",
    ],

    5: [
      "Excellent Food",
      "Amazing Taste",
      "Fast Service",
      "Friendly Staff",
      "Very Clean",
      "Great Ambience",
      "Highly Recommended",
    ],
  };

  const handleFeedback = (option) => {
    if (selectedFeedback.includes(option)) {
      setSelectedFeedback(
        selectedFeedback.filter(
          (item) => item !== option
        )
      );
    } else {
      setSelectedFeedback([
        ...selectedFeedback,
        option,
      ]);
    }

    setCopied(false);
  };

  const generateReview = () => {
    if (rating === 5) {
      return `Amazing experience! ${selectedFeedback.join(
        ", "
      )}. Everything was wonderful and I really enjoyed my visit. Highly recommended!`;
    }

    if (rating === 4) {
      return `I had a great experience. ${selectedFeedback.join(
        ", "
      )}. Overall, it was a very good experience and I would definitely recommend it.`;
    }

    if (rating === 3) {
      return `Overall, I had an average experience. ${selectedFeedback.join(
        ", "
      )}. There is some room for improvement, but overall it was okay.`;
    }

    if (rating === 2) {
      return `My experience was okay, but there is room for improvement. ${selectedFeedback.join(
        ", "
      )}. I hope the service improves in the future.`;
    }

    return `My experience was not very good. ${selectedFeedback.join(
      ", "
    )}. I hope these areas can be improved in the future.`;
  };

  const copyReview = async () => {
    try {
      await navigator.clipboard.writeText(
        generateReview()
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (error) {
      alert(
        "Unable to copy the review. Please copy it manually."
      );
    }
  };

  const goBack = () => {
    setStep(1);
    setSelectedFeedback([]);
    setCopied(false);
  };

  const startAgain = () => {
    setStep(1);
    setRating(0);
    setSelectedFeedback([]);
    setCopied(false);
  };

  const openGoogleReview = () => {
    window.open(
      GOOGLE_REVIEW_URL,
      "_blank"
    );
  };

  return (
    <div className="app">

      <div className="review-card">

        {/* STEP 1 */}

        {step === 1 && (
          <>
            <div className="hotel-name">
  🏨 HOTEL RAJDHANI DELUXE
</div>

<div className="logo-circle">
  ⭐
</div>

<h1>
  How was your experience?
</h1>
            <p className="subtitle">
              Your feedback means a lot to us!
            </p>

            <div className="stars">
              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <button
                    key={star}
                    className={
                      star <= rating
                        ? "star active"
                        : "star"
                    }
                    onClick={() =>
                      setRating(star)
                    }
                  >
                    ★
                  </button>
                )
              )}
            </div>

            <p className="rating-text">
              {rating === 0 &&
                "Select your rating"}

              {rating === 1 &&
                "We're sorry to hear that 😔"}

              {rating === 2 &&
                "We'll try to do better"}

              {rating === 3 &&
                "Thanks for your feedback!"}

              {rating === 4 &&
                "We're glad you liked it! 😊"}

              {rating === 5 &&
                "That's wonderful! 🤩"}
            </p>

            {rating > 0 && (
              <button
                className="continue-btn"
                onClick={() =>
                  setStep(2)
                }
              >
                Continue →
              </button>
            )}
          </>
        )}

        {/* STEP 2 */}

        {step === 2 && (
          <>
            <button
              className="back-btn"
              onClick={goBack}
            >
              ← Back
            </button>

            <div className="logo-circle">
              {rating === 5
                ? "🤩"
                : rating >= 3
                ? "😊"
                : "😔"}
            </div>

            <h1>
              Tell us more
            </h1>

            <p className="subtitle">
              Select what best describes
              your experience
            </p>

            <div className="feedback-grid">
              {feedbackOptions[
                rating
              ].map((option) => (
                <button
                  key={option}
                  className={
                    selectedFeedback.includes(
                      option
                    )
                      ? "feedback-option selected"
                      : "feedback-option"
                  }
                  onClick={() =>
                    handleFeedback(option)
                  }
                >
                  {selectedFeedback.includes(
                    option
                  ) && "✓ "}

                  {option}
                </button>
              ))}
            </div>

            <p className="selected-count">
              {selectedFeedback.length} option
              {selectedFeedback.length !== 1
                ? "s"
                : ""}{" "}
              selected
            </p>

            <button
              className="continue-btn"
              disabled={
                selectedFeedback.length === 0
              }
              onClick={() =>
                setStep(3)
              }
            >
              Generate My Review →
            </button>
          </>
        )}

        {/* STEP 3 */}

        {step === 3 && (
          <>
            <div className="logo-circle">
              ✨
            </div>

            <h1>
              Your Suggested Review
            </h1>

            <p className="subtitle">
              Copy this review and share
              your experience on Google
            </p>

            <div className="review-box">

              <div className="review-stars">
                {"★".repeat(rating)}
                {"☆".repeat(5 - rating)}
              </div>

              <p>
                {generateReview()}
              </p>

            </div>

            <button
              className={
                copied
                  ? "copy-btn copied"
                  : "copy-btn"
              }
              onClick={copyReview}
            >
              {copied
                ? "✓ Review Copied!"
                : "📋 Copy Review"}
            </button>

            <button
              className="google-btn"
              onClick={
                openGoogleReview
              }
            >
              ⭐ Review on Google
            </button>

            <p className="google-help">
              Copy your review first, then
              open Google and paste it.
            </p>

            <button
              className="restart-btn"
              onClick={startAgain}
            >
              Start Again
            </button>
          </>
        )}

      </div>

    </div>
  );
}

export default App;