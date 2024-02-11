export const formatDate = (date: Date): string => {
    return (
        [
            date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
            date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1,
            date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear(),
        ].join('/') +
        ' ' +
        [
            date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
            date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
            date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
        ].join(':')
    );
}