import React from 'react';

function QuestionDisplay({ question, options = [], selectedOption, onOptionSelect }) {
  return (
    <div className="mb-8">
      {/* Question */}
      {question && (
        <p
          className="text-xl font-semibold text-gray-900 mb-4"
          dangerouslySetInnerHTML={{ __html: question }}
        />
      )}

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option, index) => {
          const isSelected = selectedOption === option;

          return (
            <button
              key={index}
              onClick={() => onOptionSelect(option)}
              className={`w-full py-3 px-4 text-left rounded-lg border-2 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                ${isSelected
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'}
              `}
              dangerouslySetInnerHTML={{ __html: option }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default QuestionDisplay;
