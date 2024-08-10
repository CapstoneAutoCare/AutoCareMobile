import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const StepOne = () => (
    <View style={styles.stepContainer}>
        <Text style={styles.stepText}>Step 1: Chọn trung tâm </Text>
    </View>
);

const StepTwo = () => (
    <View style={styles.stepContainer}>
        <Text style={styles.stepText}>Step 2: Chọn xe</Text>
    </View>
);

const StepThree = () => (
    <View style={styles.stepContainer}>
        <Text style={styles.stepText}>Step 3: Chọn odo</Text>
    </View>

);
const StepFour = () => (
    <View style={styles.stepContainer}>
        <Text style={styles.stepText}>Step 4: Chọn dịch vụ</Text>
    </View>
);
const ProcessStepsScreen = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        <StepOne key="step1" />,
        <StepTwo key="step2" />,
        <StepThree key="step3" />,
        <StepFour key="step4" />,
    ];

    const onNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const onPrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const onSubmit = () => {
        alert('Form submitted!');
    };

    return (
        <View style={styles.container}>
            <View style={styles.stepContent}>{steps[currentStep]}</View>
            <View style={styles.footer}>
                <Button
                    title="Previous"
                    onPress={onPrevious}
                    disabled={currentStep === 0}
                />
                {currentStep === steps.length - 1 ? (
                    <Button title="Submit" onPress={onSubmit} />
                ) : (
                    <Button title="Next" onPress={onNext} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    stepContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepText: {
        fontSize: 18,
        marginBottom: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default ProcessStepsScreen;
