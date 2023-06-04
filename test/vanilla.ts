describe("[S] vanilla", () => {
    test("[T] undefined", () => {
        expect(undefined).toBeUndefined();
    });

    test("[T] null", () => {
        expect(null).toBeNull();
    });

    test("[T] NaN", () => {
        expect(NaN).toBeNaN();
    });
});
